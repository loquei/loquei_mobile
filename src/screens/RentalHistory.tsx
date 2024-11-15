import { useState, useCallback } from "react";
import { FlatList } from "react-native";
import { View } from "@gluestack-ui/themed";
import { useFocusEffect } from "@react-navigation/native";
import { ScreenHeader } from "@components/ScreenHeader";
import { Loading } from "@components/Loading";
import { listRentals } from "../api/listRentals";
import { GetItem } from "../api/getItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery, useQueries } from '@tanstack/react-query';
import { RentalItemCard } from "@components/RentalItemCard";

interface Rental {
  id: string;
  item: string;
  status: string;
  start_date: string;
  end_date: string;
}

type ItemData = {
  name?: string;
};

export function RentalHistory() {
  const [currentUserId, setCurrentUserId] = useState<string>("");

  const fetchRentals = async () => {
    if (currentUserId) {
      const rentals = await listRentals(currentUserId);
      return rentals && Array.isArray(rentals.items) ? rentals.items : [];
    }
    return [];
  };

  const { data: rentalsData, isLoading: isRentalsLoading } = useQuery({
    queryKey: ['rentals', currentUserId],
    queryFn: fetchRentals,
    enabled: !!currentUserId,
    initialData: [],
  });

  interface ItemQuery {
    queryKey: (string | undefined)[];
    queryFn: () => Promise<ItemData>;
    enabled: boolean;
  }

  const itemQueries = useQueries<ItemQuery[]>({
    queries: (rentalsData || []).map((rental: Rental) => ({
      queryKey: ['item', rental.item, rental.id],
      queryFn: () => GetItem(rental.item),
      enabled: !!rental.item,
    }))
  });

  const isItemsLoading = itemQueries.some(query => query.isLoading);

  useFocusEffect(
    useCallback(() => {
      const fetchCurrentUser = async () => {
        try {
          const currentUser = await AsyncStorage.getItem("currentUser");
          if (currentUser) {
            const parsedUser = JSON.parse(currentUser);
            setCurrentUserId(parsedUser.items[0]?.id || "");
          }
        } catch (error) {
          console.error("Error fetching current user:", error);
        }
      };
      fetchCurrentUser();
    }, [])
  );

  if (isRentalsLoading || isItemsLoading) {
    return <Loading />;
  }

  const itemsData: ItemData[] = itemQueries.map(query => query.data as ItemData);

  return (
    <View flex={1} mb={16}>
      <ScreenHeader title="Histórico de Aluguéis" backButton />
      <FlatList
        data={rentalsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          const itemName = itemsData[index]?.name;

          return (
            <RentalItemCard
              id={item.item}
              title={itemName}
              status={item.status}
              startDate={item.start_date}
              endDate={item.end_date}
              totalValue={item.total_value}
            />
          );
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
