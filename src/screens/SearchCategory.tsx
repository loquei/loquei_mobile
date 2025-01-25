import {
  Center,
  Pressable,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { listItemByCategory } from "../api/listItemByCategory";
import { useCallback, useEffect, useState } from "react";
import { Loading } from "@components/Loading";
import { ScreenHeader } from "@components/ScreenHeader";
import { useCategoryId } from "@contexts/CategoryIdContext";
import { baseURL } from "../constants/authentications";
import { IGetItem } from "../@types/TItem";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { ProductCard } from "@components/ProductCard";
import { FlatList } from "react-native";

export function SearchCategory() {
  const { categoryId } = useCategoryId();
  const [itemDataByCategory, setItemDataByCategory] = useState<IGetItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const data = await listItemByCategory(categoryId.id);
          if (data) {
            setItemDataByCategory(data);
            console.log("data", data);
          }
        } catch (error) {
          console.error("Error fetching data: ", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }, [categoryId.id])
  );

  return (
    <VStack flex={1}>
      <ScreenHeader title={categoryId.name} backButton />
      <FlatList
        data={itemDataByCategory}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 16,
          flexGrow: 1,
        }}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => {
          const product = item as IGetItem;
          return (
            <Pressable
              onPress={() =>
                navigation.navigate("productDetails", { id: product.id })
              }
              style={{ margin: 8 }}
            >
              <ProductCard
                imagePath={
                  item.images && item.images.links.length > 0
                    ? baseURL + item.images.links[0]
                    : ""
                }
                title={product.name}
                price={product.daily_value.toFixed(2).replace(".", ",")}
                discountPrice={(product.daily_value * 0.9)
                  .toFixed(2)
                  .replace(".", ",")}
                rating={item.score}
                ratingCount={item.score}
              />
            </Pressable>
          );
        }}
        ListEmptyComponent={() =>
          isLoading ? (
            <Loading />
          ) : (
            <Center flex={1}>
              <Text
                fontFamily="$heading"
                fontSize="$lg"
                color="$textDark800"
                textAlign="center"
                mt={16}
              >
                Nenhum produto encontrado para "{categoryId.name}"
              </Text>
            </Center>
          )
        }
      />
    </VStack>
  );
}
