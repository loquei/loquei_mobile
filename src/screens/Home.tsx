import { CategoryCard } from "@components/CategoryCard";
import { Tag } from "@components/Tag";
import { ProductCard } from "@components/ProductCard";
import { ScreenHeader } from "@components/ScreenHeader";
import { HStack, VStack, Text, Pressable } from "@gluestack-ui/themed";

import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { useEffect, useState } from "react";
import { FlatList, ScrollView, SectionList } from "react-native";
import { ListItems } from "../api/listItem";
import { IGetItem } from "../@types/TItem";

export function Home() {
  const [itemData, setItemData] = useState<IGetItem[]>([]);
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const [categories, setCategories] = useState([
    "Eletrônicos",
    "Festa",
    "Ferramentas",
    "Carros",
  ]);
  const [categorySelected, setCategorySelected] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const data = await ListItems();
      if (data) {
        setItemData(data);
      }
    };
    fetchData();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}
    >
      <VStack>
        <ScreenHeader title="São Paulo, SP" iconButton />

        <FlatList
          data={categories}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Tag
              name={item}
              isActive={categorySelected.toLowerCase() === item.toLowerCase()}
              onPress={() => setCategorySelected(item)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          style={{ marginTop: 16, maxHeight: 44, minHeight: 44 }}
        />

        <SectionList
          scrollEnabled={false}
          sections={[{ title: "Produtos Principais", data: itemData }]}
          keyExtractor={(item) => item.id}
          renderItem={(item) => null}
          renderSectionHeader={({ section }) => (
            <VStack>
              <Text
                px={16}
                py={8}
                fontFamily="$heading"
                fontSize="$lg"
                color="$textDark800"
              >
                {section.title}
              </Text>
              <FlatList
                data={section.data || []}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => navigation.navigate("productDetails")}
                  >
                    <ProductCard
                      title={item.name}
                      price={item.daily_value}
                      discountPrice={item.daily_value - 10}
                      rating={5}
                      ratingCount={5}
                    />
                  </Pressable>
                )}
                contentContainerStyle={{ paddingHorizontal: 16 }}
                ItemSeparatorComponent={() => <HStack width={12} />}
              />
            </VStack>
          )}
        ></SectionList>

        <SectionList
          scrollEnabled={false}
          sections={[
            {
              title: "Novos",
              data: [
                {
                  id: "1",
                  title: "Smartphone Samsung Galaxy S21",
                  rating: 4,
                  ratingCount: 14,
                  price: "R$ 3.999,00",
                  discountPrice: "R$ 3.499,00",
                },
                {
                  id: "2",
                  title: "Smartwatch Samsung Galaxy Watch 4",
                  rating: 4,
                  ratingCount: 14,
                  price: "R$ 3.999,00",
                  discountPrice: "R$ 3.499,00",
                },
                {
                  id: "3",
                  title: "Notebook Dell Inspiron 15",
                  rating: 4,
                  ratingCount: 14,
                  price: "R$ 3.999,00",
                  discountPrice: "R$ 3.499,00",
                },
                {
                  id: "4",
                  title: 'Smart TV LG 50" 4K',
                  rating: 4,
                  ratingCount: 14,
                  price: "R$ 3.999,00",
                  discountPrice: "R$ 3.499,00",
                },
              ],
            },
          ]}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => null} // Rendered in renderSectionHeader
          renderSectionHeader={({ section }) => (
            <VStack>
              <Text
                px={16}
                py={8}
                fontFamily="$heading"
                fontSize="$lg"
                color="$textDark800"
              >
                {section.title}
              </Text>
              <FlatList
                data={section.data || []}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => navigation.navigate("productDetails")}
                  >
                    <ProductCard
                      title={item.title}
                      rating={item.rating}
                      ratingCount={item.ratingCount}
                    />
                  </Pressable>
                )}
                contentContainerStyle={{ paddingHorizontal: 16 }}
                ItemSeparatorComponent={() => <HStack width={12} />}
              />
            </VStack>
          )}
          style={{ marginTop: 16 }}
        />

        <SectionList
          scrollEnabled={false}
          sections={[
            {
              title: "Explore",
              data: [
                { id: "1", title: "Eletrônicos" },
                { id: "2", title: "Roupas" },
                { id: "3", title: "Móveis" },
              ],
            },
          ]}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CategoryCard name={item.title} icon={item.title} />
          )}
          renderSectionHeader={({ section }) => (
            <Text
              py={8}
              fontFamily="$heading"
              fontSize="$lg"
              color="$textDark800"
            >
              {section.title}
            </Text>
          )}
          ItemSeparatorComponent={() => <HStack height={10} />}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          style={{ marginTop: 16 }}
        />

        <Text
          fontFamily="$body"
          fontSize="$md"
          color="$textDark800"
          textAlign="center"
          mt={16}
        >
          © 2024 Loquei. Todos os direitos reservados.
        </Text>
      </VStack>
    </ScrollView>
  );
}
