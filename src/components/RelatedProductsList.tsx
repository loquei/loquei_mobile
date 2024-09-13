import { Text } from "@gluestack-ui/themed";
import { Pressable } from "@gluestack-ui/themed";
import { VStack } from "@gluestack-ui/themed";
import { FlatList, SectionList } from "react-native";
import { ProductCard } from "./ProductCard";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { HStack } from "@gluestack-ui/themed";

export function RelatedProductsList() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  return (
    <SectionList
      scrollEnabled={false}
      sections={[
        {
          title: 'Produtos relacionados',
          data: [
            { id: '1', title: 'Smartphone Samsung Galaxy S21', rating: 4, ratingCount: 14, price: 'R$ 3.999,00', discountPrice: 'R$ 3.499,00' },
            { id: '2', title: 'Smartwatch Samsung Galaxy Watch 4', rating: 4, ratingCount: 14, price: 'R$ 3.999,00', discountPrice: 'R$ 3.499,00' },
            { id: '3', title: 'Notebook Dell Inspiron 15', rating: 4, ratingCount: 14, price: 'R$ 3.999,00', discountPrice: 'R$ 3.499,00' },
            { id: '4', title: 'Smart TV LG 50" 4K', rating: 4, ratingCount: 14, price: 'R$ 3.999,00', discountPrice: 'R$ 3.499,00' },
          ]
        }
      ]}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => null} // Rendered in renderSectionHeader
      renderSectionHeader={({ section }) => (
        <VStack>
          <Text px={16} py={8} fontFamily="$heading" fontSize="$lg" color="$textDark800">
            {section.title}
          </Text>
          <FlatList
            data={section.data}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <Pressable onPress={() => navigation.navigate('productDetails')}>
                <ProductCard title={item.title} rating={item.rating} ratingCount={item.ratingCount} />
              </Pressable>
            )}
            contentContainerStyle={{ paddingHorizontal: 16 }}
            ItemSeparatorComponent={() => <HStack width={12} />}
          />
        </VStack>
      )}
      style={{ marginTop: 16, marginBottom: 16 }}
    />
  )
}