import { Button } from "@components/Button";
import { ProductImagesCarousel } from "@components/ProductImagesCarousel";
import { ScreenHeader } from "@components/ScreenHeader";
import { Tag } from "@components/Tag";
import { HStack, Text, VStack, View } from "@gluestack-ui/themed";
import { useCallback, useState } from "react";
import { FlatList, ScrollView } from "react-native";
import { ProductDetailsAccordion } from "@components/ProductDetailsAccordion";
import { ProductReviews } from "@components/ProductContainerReviews";
import { RelatedProductsList } from "@components/RelatedProductsList";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { GetItem } from "../api/getItem";
import { IGetItem } from "../@types/TItem";
import { Loading } from "@components/Loading";
import { postRental } from "../api/postRental";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { listRentals } from "../api/listRentals";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

export function ProductDetails() {
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [productDetails, setProductDetails] = useState<IGetItem>();
  const [rentalTimes, setRentalTimes] = useState<string[]>([]);
  const [rentalTimeSelected, setRentalTimeSelected] = useState('');
  const [productRentals, setProductRentals] = useState<any[]>([]);
  const [filteredRentals, setFilteredRentals] = useState<any[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const route = useRoute();
  const { id } = route.params as { id: string };

  const fetchProductDetails = useCallback(async () => {
    try {
      console.log(`Buscando detalhes do produto ${id}...`);
      const item = await GetItem(id);
      console.log(`Detalhes do produto ${id} recebidos:`, item);
      setProductDetails(item);

      const times: string[] = [];
      if (item.min_days) {
        times.push(item.min_days.toString() + ' dias');
      }
      if (item.max_days) {
        times.push(item.max_days.toString() + ' dias');
      }

      setRentalTimes(times);
      setRentalTimeSelected(times[0]);
    } catch (error) {
      console.error('Erro ao buscar detalhes do produto:', error);
    }
  }, [id]);

  const fetchRentals = useCallback(async () => {
    setIsLoading(true);
    try {
      console.log(`Buscando aluguéis do produto ${id} e do usuário ${currentUserId}...`);

      if (currentUserId) {
        const rentals = await listRentals(currentUserId);

        if (rentals && Array.isArray(rentals.items)) {
          console.log(`Aluguéis do produto ${id} e do usuário ${currentUserId} recebidos:`, rentals.items);
          setProductRentals(rentals.items);

          const filteredRentals = rentals.items.filter((rental: { item: string; }) => rental.item === id);
          console.log(`Aluguéis do produto ${id} recebidos:`, filteredRentals);

          setFilteredRentals(filteredRentals);
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
  }, [id, currentUserId]);

  const createRental = async () => {
    if (!productDetails) {
      console.error('Detalhes do produto não encontrados.');
      return;
    }

    const rentalTimeNumber = parseInt(rentalTimeSelected.replace(/\D/g, ''), 10);
    const rental = {
      lessor_id: productDetails?.user_id,
      lessee_id: currentUserId,
      item_id: id,
      rental_time: rentalTimeNumber,
    };

    console.log('Rental:', rental);

    // Tente criar o aluguel
    try {
      await postRental(
        rental.lessor_id,
        rental.lessee_id,
        rental.item_id,
        rental.rental_time
      );

      // Após criar o aluguel, faça uma nova chamada para buscar os aluguéis atualizados
      await fetchRentals(); // Chama a função que você já criou para buscar aluguéis

    } catch (error) {
      console.error('Erro ao criar o aluguel:', error);
    }
  };


  function handleUserToDashboard() {
    navigation.navigate('dashboard');
  }

  const getStatusDescription = (status: string) => {
    switch (status) {
      case "PENDING":
        return "Pendente";
      case "ACCEPTED":
        return "Aceita";
      case "REFUSED":
        return "Recusada";
      case "CANCELED":
        return "Cancelada";
      case "COMPLETED":
        return "Concluída";
      case "IN_PROGRESS":
        return "Em andamento";
      default:
        return "Status desconhecido";
    }
  };

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
        console.log('O CURRENT USER ID', currentUserId);
        await fetchProductDetails();

        if (currentUserId) {
          await fetchRentals();
        }
      };

      loadData();
    }, [fetchProductDetails, fetchRentals, currentUserId])
  );

  if (!productDetails) {
    return <Loading />;
  }

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

          <Text fontFamily="$body" mt={8} px={16} color="$textDark800">
            Available in Graphite, Gold, Silver, and Sierra Blue.
          </Text>

          <VStack mt={16} px={16}>
            <VStack>
              <HStack>
                <Text fontFamily="$body" fontSize={"$lg"} color="$textDark800">
                  De <Text fontFamily="$body" fontSize={"$lg"} textDecorationLine="line-through">
                    R$ {productDetails.daily_value.toFixed(2).replace('.', ',')}
                  </Text>
                </Text>
              </HStack>
              <HStack>
                <Text fontFamily="$body" fontSize={"$lg"} color="$textDark800" alignItems="center">
                  Por <Text fontFamily="$heading" fontSize={"$2xl"} color="$teal600">
                    R$ {productDetails.daily_value.toFixed(2).replace('.', ',')}
                  </Text>
                </Text>
              </HStack>
            </VStack>
          </VStack>

          <VStack mt={16} px={16}>
            <Text fontFamily="$heading" fontSize={"$lg"} color="$textDark800">
              Tempo para aluguel
            </Text>
            <HStack mt={12} justifyContent="space-between">
              <FlatList
                data={rentalTimes}
                keyExtractor={(item) => item}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <Tag
                    name={item}
                    isActive={item === rentalTimeSelected}
                    onPress={() => setRentalTimeSelected(item)}
                  />
                )}
                ItemSeparatorComponent={() => <HStack width={12} />}
              />
            </HStack>
          </VStack>

          <ProductDetailsAccordion />

          <RelatedProductsList />

          <ProductReviews />

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
        {isLoading ? (
          <Button title="Carregando" buttonVariant="solid" disabled />
        ) : (
          <>
            {currentUserId === productDetails.user_id ? (
              <Button title="Gerenciar Produto" buttonVariant="solid" onPress={handleUserToDashboard} />
            ) : (
              <>
                {filteredRentals.length > 0 ? (
                  <Button
                    title={`Locação ${getStatusDescription(filteredRentals[0].status)}`}
                    buttonVariant="outline"
                  />
                ) : (
                  <>
                    <Button title="Alugar" buttonVariant="solid" onPress={createRental} />
                    <Button title="Adicionar à lista de desejos" buttonVariant="outline" />
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
