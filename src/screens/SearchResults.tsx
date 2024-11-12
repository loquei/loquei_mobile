import { HStack, VStack, Text, Center } from "@gluestack-ui/themed";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Pressable, FlatList } from "react-native";
import { SearchItems } from "../api/searchItems";
import { IGetItem } from "../@types/TItem";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { ProductCard } from "@components/ProductCard";
import { Loading } from "@components/Loading";
import { ScreenHeader } from "@components/ScreenHeader";
import { baseURL } from "../constants/authentications";

export function SearchResults() {
  const [itemData, setItemData] = useState<IGetItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const route = useRoute();
  const { searchTerm } = route.params as { searchTerm: string };
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const data = await SearchItems(searchTerm);
          if (data) {
            setItemData(data);
            console.log("data", data);
          }
        } catch (error) {
          console.error("Error fetching data: ", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }, [searchTerm])
  );

  return (
    <VStack flex={1}>
      <ScreenHeader title="Resultados da pesquisa" backButton />
      <FlatList
        data={itemData}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 16,
          flexGrow: 1,
        }}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              navigation.navigate("productDetails", { id: item.id })
            }
            style={{ margin: 8 }}
          >
            <ProductCard
              imagePath={
                item.images && item.images.links.length > 0
                  ? baseURL + item.images.links[0]
                  : ""
              }
              title={item.name}
              price={item.daily_value.toFixed(2).replace(".", ",")}
              discountPrice={(item.daily_value * 0.9)
                .toFixed(2)
                .replace(".", ",")}
              rating={4.5}
              ratingCount={24}
            />
          </Pressable>
        )}
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
                Nenhum produto encontrado para "{searchTerm}"
              </Text>
            </Center>
          )
        }
      />
    </VStack>
  );
}
