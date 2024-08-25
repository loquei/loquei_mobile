import { Button } from "@components/Button";
import { ProductImagesCarousel } from "@components/ProductImagesCarousel";
import { ScreenHeader } from "@components/ScreenHeader";
import { Tag } from "@components/Tag";
import { HStack, Text, VStack, View } from "@gluestack-ui/themed";
import { useState } from "react";
import { FlatList } from "react-native";
import { ScrollView } from "react-native";
import { ProductDetailsAccordion } from "@components/ProductDetailsAccordion";
import { ProductReviews } from "@components/ProductContainerReviews";
import { RelatedProductsList } from "@components/RelatedProductsList";


export function ProductDetails() {

  const [rentalTimes, setRentalTimes] = useState(['1 dia', '3 dias', '7 dias']);
  const [rentalTimeSelected, setRentalTimeSelected] = useState('1 dia');

  const [scrollEnabled, setScrollEnabled] = useState(true);

  return (
    <View flex={1} margin={0} padding={0}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} nestedScrollEnabled={true} scrollEnabled={scrollEnabled}>
        <VStack flex={1} pb={32}>
          <ScreenHeader title="Detalhes do produto" backButton />

          <ProductImagesCarousel setScrollEnabled={setScrollEnabled} />

          <Text fontFamily="$heading" fontSize={"$2xl"} mt={24} px={16} color="$textDark800">
            Apple iPhone 13 Pro Max
          </Text>

          <Text fontFamily="$mono" fontSize={"$lg"} mt={8} px={16} color="$textDark800">
            The iPhone 13 Pro Max features a 6.7-inch Super Retina XDR display, A15 Bionic chip, and a Pro camera system.
          </Text>

          <Text fontFamily="$body" mt={8} px={16} color="$textDark800">
            Available in Graphite, Gold, Silver, and Sierra Blue.
          </Text>

          <VStack mt={16} px={16}>
            <VStack>
              <HStack>
                <Text fontFamily="$body" fontSize={"$lg"} color="$textDark800">
                  De <Text fontFamily="$body" fontSize={"$lg"} textDecorationLine="line-through">R$ 7.599,00</Text>
                </Text>
              </HStack>
              <HStack>
                <Text fontFamily="$body" fontSize={"$lg"} color="$textDark800" alignItems="center">
                  Por <Text fontFamily="$heading" fontSize={"$2xl"} color="$teal600">R$ 7.599,00</Text>
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
      <HStack px={16} py={8} gap={8} justifyContent="space-between" bg="$white" borderTopWidth={1} borderTopColor="$textLight600">
        <Button title="Lista de desejos" buttonVariant="outline" flex={1} />
        <Button title="Alugar" buttonVariant="solid" flex={1} />
      </HStack>
    </View>
  );
}
