import { Button } from "@components/Button";
import { ProductImagesCarousel } from "@components/ProductImagesCarousel";
import { ScreenHeader } from "@components/ScreenHeader";
import { Tag } from "@components/Tag";
import { HStack, Text, VStack, View, set } from "@gluestack-ui/themed";
import { useCallback, useState } from "react";
import { FlatList } from "react-native";
import { ScrollView } from "react-native";
import { ProductDetailsAccordion } from "@components/ProductDetailsAccordion";
import { ProductReviews } from "@components/ProductContainerReviews";
import { RelatedProductsList } from "@components/RelatedProductsList";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { GetItem } from "../api/getItem";
import { IGetItem } from "../@types/TItem";
import { Loading } from "@components/Loading";

export function ProductDetails() {

  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [productDetails, setProductDetails] = useState<IGetItem>();

  const [rentalTimes, setRentalTimes] = useState<string[]>([]);
  const [rentalTimeSelected, setRentalTimeSelected] = useState('');

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

  useFocusEffect(
    useCallback(() => {
      fetchProductDetails();
    }, [fetchProductDetails])
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
        <Button title="Alugar" buttonVariant="solid" />
        <Button title="Adicionar à lista de desejos" buttonVariant="outline" />
      </VStack>
    </View>
  );
}
