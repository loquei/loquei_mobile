import { Button } from "@components/Button";
import { ProductImagesCarousel } from "@components/ProductImagesCarousel";
import { ScreenHeader } from "@components/ScreenHeader";
import { Tag } from "@components/Tag";
import { HStack, Text, VStack, View } from "@gluestack-ui/themed";
import { useCallback, useEffect, useState } from "react";
import { FlatList, ScrollView } from "react-native";
import accordionData, { DetailsAccordion } from "@components/DetailsAccordion";
import { ProductContainerReviews } from "@components/ProductContainerReviews";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { GetItem } from "../api/getItem";
import { IGetItem } from "../@types/TItem";
import { Loading } from "@components/Loading";
import { listRentals } from "../api/listRentals";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { postWishlistItem } from "../api/postWishlistItem";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getStatusDescription } from "@utils/getStatusDescription";
import { listWishlistItems } from "../api/listWishlistItems";
import { deleteWishlistItem } from "../api/deleteWishlistItem";

interface WishlistItem {
  item_id: string;
}

export function ProductDetails() {
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [rentalTimes, setRentalTimes] = useState<string[]>([]);
  const [productRentals, setProductRentals] = useState<any[]>([]);
  const [filteredRentals, setFilteredRentals] = useState<any[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string>("");

  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const queryClient = useQueryClient();

  const route = useRoute();
  const { id } = route.params as { id: string };

  const fetchProductDetails = async () => {
    const item = await GetItem(id);
    const times: string[] = [];
    if (item.min_days) {
      times.push(item.min_days.toString() + ' dias');
    }
    if (item.max_days) {
      times.push(item.max_days.toString() + ' dias');
    }
    setRentalTimes(times);
    return item;
  };

  const fetchRentals = async () => {
    if (productDetails?.user_id) {
      const rentals = await listRentals(productDetails.user_id);
      if (rentals && Array.isArray(rentals.items)) {
        setProductRentals(rentals.items);
        const filteredRentals = rentals.items.filter((rental: { item: string; }) => rental.item === id);
        setFilteredRentals(filteredRentals);
        return rentals.items;
      }
    }
    return []; // Retorna um array vazio se não houver dados
  };

  const { data: productDetails, isLoading: isProductLoading } = useQuery({
    queryKey: ['productDetails', id],
    queryFn: fetchProductDetails
  });

  const { data: rentalsData, isLoading: isRentalsLoading, refetch: refetchRentals } = useQuery({
    queryKey: ['rentals', productDetails?.user_id],
    queryFn: fetchRentals,
    enabled: !!productDetails?.user_id,
  });

  const { data: wishlistItems, refetch: refetchWishlistItems } = useQuery({
    queryKey: ['wishlist', currentUserId],
    queryFn: () => listWishlistItems(currentUserId),
    enabled: !!currentUserId,
  });

  useEffect(() => {
    if (rentalsData) {
      setProductRentals(rentalsData);
      const filtered = rentalsData.filter((rental: { item: string; }) => rental.item === id);
      setFilteredRentals(filtered);
    }
  }, [rentalsData]);

  useFocusEffect(
    useCallback(() => {
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

      fetchCurrentUser().then(() => {
        refetchRentals();
      });
    }, [refetchRentals])
  );

  function handleUserToDashboard() {
    navigation.navigate('dashboard');
  }

  function handleUserToCalendar() {
    if (productDetails?.user_id) {
      navigation.navigate('calendar', {
        itemId: id,
        lessorId: productDetails.user_id,
        lesseeId: currentUserId,
        minDays: productDetails.min_days,
        maxDays: productDetails.max_days,
        filteredRentals: filteredRentals.filter(rental => rental.status !== 'REFUSED' && rental.status !== 'CANCELED'),
      });
    }
  }

  function handleUserToRentalHistory() {
    navigation.navigate('rentalHistory', {
      id: currentUserId,
    });
  }

  async function handleItemToWishlist() {
    await postWishlistItem(currentUserId, id);
    queryClient.invalidateQueries({ queryKey: ['wishlist', currentUserId] });
    refetchWishlistItems();
  }

  async function handleDeleteUniqueItemFromWishlist(userId: string, itemId: string) {
    try {
      await deleteWishlistItem(userId, itemId);
      queryClient.invalidateQueries({ queryKey: ['wishlist', currentUserId] });
      refetchWishlistItems();
    } catch (error) {
      console.error("Erro ao excluir o item da lista de desejos:", error);
    }
  }

  if (isProductLoading || !productDetails) {
    return <Loading />;
  }

  console.log('filteredRentals', filteredRentals);
  const userRentals = filteredRentals.filter(rental => rental.lessee === currentUserId);
  const userRentalsStatus = userRentals.map(rental => rental.status);
  const hasSomeRentalTerminated = userRentalsStatus.includes('TERMINATED');
  console.log('HAS TERMINATED', hasSomeRentalTerminated);

  console.log('userRentals', userRentals);
  console.log('currentUserId', currentUserId);

  return (
    <View flex={1} margin={0} padding={0}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} nestedScrollEnabled={true} scrollEnabled={scrollEnabled}>
        <VStack flex={1} pb={32}>
          <ScreenHeader title="Detalhes do produto" backButton />

          <ProductImagesCarousel setScrollEnabled={setScrollEnabled} imagesPaths={
            productDetails.images.links.map((link) => link)
          } />

          <Text fontFamily="$heading" fontSize={"$2xl"} mt={24} px={16} color="$textDark800">
            {productDetails.name}
          </Text>

          <Text fontFamily="$mono" fontSize={"$lg"} mt={8} px={16} color="$textDark800">
            {productDetails.description}
          </Text>

          <VStack mt={16} px={16}>
            <VStack>
              <HStack>
                <Text fontFamily="$body" fontSize={"$lg"} color="$textDark800" alignItems="center">
                  <Text fontFamily="$heading" fontSize={"$2xl"} color="$teal600">
                    R$ {productDetails.daily_value.toFixed(2).replace('.', ',')}
                  </Text> / dia
                </Text>
              </HStack>
            </VStack>
          </VStack>

          <VStack mt={24} px={16}>
            <Text fontFamily="$heading" fontSize={"$lg"} color="$textDark800">
              Tempo para aluguel
            </Text>
            <HStack mt={12} justifyContent="space-between">
              <FlatList
                data={rentalTimes}
                keyExtractor={(item) => item}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <VStack>
                    {index === 0 && (
                      <Tag
                        name={'Mínimo ' + item}
                      />
                    )}

                    {index === 1 && (
                      <Tag
                        name={'Máximo ' + item}
                      />
                    )}
                  </VStack>
                )}
                ItemSeparatorComponent={() => <HStack width={12} />}
              />
            </HStack>
          </VStack>

          <VStack mt={24}>
            <DetailsAccordion type="productDetailsScreen" items={accordionData.productDetailsScreen} />
          </VStack>

          <VStack mt={24}>
            <ProductContainerReviews itemId={id} raterId={currentUserId} isItemOwner={
              currentUserId === productDetails.user_id
            } perPage={3} hasSomeRentalTerminated={hasSomeRentalTerminated} />
          </VStack>
        </VStack>

      </ScrollView>
      <VStack
        px={16}
        py={8}
        gap={8}
        justifyContent="space-between"
        bg="$white"
        hardShadow="5"
      >
        {isRentalsLoading ? (
          <Button title="Carregando" buttonVariant="solid" disabled />
        ) : (
          <>
            {currentUserId === productDetails.user_id ? (
              <Button title="Gerenciar Produto" buttonVariant="solid" onPress={handleUserToDashboard} />
            ) : (
              <>
                {userRentals.length > 0 ? (
                  <>
                    <Button
                      title="Ver no histórico de aluguéis"
                      buttonVariant="outline"
                      onPress={handleUserToRentalHistory}
                    />
                    {
                      wishlistItems?.find((item: WishlistItem) => item.item_id === id) ? (
                        <Button
                          title="Remover da lista de desejos"
                          buttonVariant="danger-outline"
                          onPress={() => handleDeleteUniqueItemFromWishlist(currentUserId, id)}
                        />
                      ) : (
                        <Button
                          title="Adicionar à lista de desejos"
                          buttonVariant="secondary"
                          onPress={handleItemToWishlist}
                        />
                      )
                    }
                    <Button title="Selecionar data de aluguel" buttonVariant="solid" onPress={handleUserToCalendar} />
                  </>
                ) : (
                  <>
                    {
                      wishlistItems?.find((item: WishlistItem) => item.item_id === id) ? (
                        <Button
                          title="Remover da lista de desejos"
                          buttonVariant="danger-outline"
                          onPress={() => handleDeleteUniqueItemFromWishlist(currentUserId, id)}
                        />
                      ) : (
                        <Button
                          title="Adicionar à lista de desejos"
                          buttonVariant="secondary"
                          onPress={handleItemToWishlist}
                        />
                      )
                    }
                    <Button title="Selecionar data de aluguel" buttonVariant="solid" onPress={handleUserToCalendar} />
                  </>
                )}
              </>
            )}
          </>
        )}
      </VStack>
    </View>
  );
}