import { ScreenHeader } from "@components/ScreenHeader";
import { VStack, HStack, Text } from "@gluestack-ui/themed";
import { ListFilter, RotateCw, ArrowDownUp } from 'lucide-react-native';
import { gluestackUIConfig } from "../../config/gluestack-ui.config";
import { FlatList, ScrollView, TouchableOpacity } from "react-native";
import { ItemCard } from "@components/ItemCard";
import { useCallback, useState } from "react";
import { listRentals } from "../api/listRentals";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Loading } from "@components/Loading";
import { getStatusDescription } from "@utils/getStatusDescription";
import { format } from "date-fns";

interface IRental {
  id: string;
  lessor: string;
  lessee: string;
  item: string;
  start_date: string;
  end_date: string;
  total_value: number;
  status: string;
}

export function AllOrders() {
  const { tokens } = gluestackUIConfig;

  const [userRentals, setUserRentals] = useState<IRental[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchRentals = useCallback(async () => {
    setIsLoading(true);
    try {
      if (currentUserId) {
        const rentals = await listRentals(currentUserId);
        if (rentals && Array.isArray(rentals.items)) {
          setUserRentals(rentals.items);
        } else {
          console.warn("Os dados recebidos não estão no formato esperado:", rentals);
        }
      } else {
        console.warn("currentUserId não está definido.");
      }
    } catch (error) {
      console.error('Erro ao buscar aluguéis do produto:', error);
    } finally {
      setIsLoading(false);
    }
  }, [currentUserId]);

  const filterRentals = userRentals.filter((rental) => rental.lessor === currentUserId);

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      const fetchCurrentUser = async () => {
        try {
          const currentUser = await AsyncStorage.getItem("currentUser");
          if (currentUser) {
            const parsedUser = JSON.parse(currentUser);
            if (parsedUser && parsedUser.items[0].id) {
              setCurrentUserId(parsedUser.items[0].id);
            } else {
              console.warn("Formato inesperado em currentUser:", currentUser);
            }
          } else {
            console.warn("Nenhum usuário atual encontrado no AsyncStorage.");
          }
        } catch (error) {
          console.error("Error fetching current user:", error);
        }
      };

      const loadData = async () => {
        await fetchCurrentUser();
        if (currentUserId) {
          await fetchRentals();
        }
      };

      loadData();
    }, [fetchRentals, currentUserId])
  );

  if (isLoading) {
    return <Loading />;
  }

  if (filterRentals.length === 0) {
    return (
      <VStack flex={1}>
        <ScreenHeader title="Pedidos" backButton />
        <VStack flex={1} justifyContent="center" alignItems="center">
          <Text fontFamily="$body" fontSize="$lg" color="$textDark800">
            Nenhum pedido encontrado.
          </Text>
        </VStack>
      </VStack>
    );
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Pedidos" backButton />

      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} nestedScrollEnabled={true} style={{ paddingHorizontal: 16 }}>
        <VStack p={16} mt={16} bg="$white" rounded={"$md"} alignItems="center">
          <Text fontFamily="$mono" fontSize="$md" color="$textDark800">
            Total de locações
          </Text>

          <Text fontFamily="$heading" fontSize="$2xl" color="$textDark800">
            {filterRentals.length}
          </Text>
        </VStack>

        <FlatList
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          data={filterRentals}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => {
            return (
              <VStack>
                <ItemCard
                  id={item.id}
                  type="order"
                  title={`Locação #${index + 1}`}
                  description={getStatusDescription(item.status)}
                  date={format(new Date(item.start_date), "dd/MM/yyyy")}
                  price={item.total_value.toFixed(2).replace(".", ",")}
                  imagesPaths="https://icons.veryicon.com/png/o/system/linear-chh/order-27.png"
                />
              </VStack>
            );
          }}
          ItemSeparatorComponent={() => <VStack height={16} />}
          style={{ marginTop: 16, paddingBottom: 32 }}
        />

      </ScrollView>
    </VStack>
  );
}
