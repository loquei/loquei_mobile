import { CategoryCard } from "@components/CategoryCard";
import { Tag } from "@components/Tag";
import { ProductCard } from "@components/ProductCard";
import { ScreenHeader } from "@components/ScreenHeader";
import { HStack, VStack, Text, Pressable, get } from "@gluestack-ui/themed";

import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { useCallback, useState } from "react";
import { FlatList, ScrollView, SectionList } from "react-native";
import { ListItems } from "../api/listItem";
import { IGetItem } from "../@types/TItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GetItemFirstImage } from "../api/getItemFirstImage";
import { getUser } from "../api/getUser";

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
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>();

  const baseURL = "http://192.168.3.2:8080";

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const data = await ListItems();
          if (data) {
            setItemData(data);
            console.log("data", data);
            if (data.length > 0) {
              console.log("First item image link", baseURL + data[0].images.links[0]);
            }
          }
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };

      const checkAuthentication = async () => {
        const authToken = await AsyncStorage.getItem("AuthToken");
        console.log("authToken", authToken);
        setIsUserAuthenticated(!!authToken);
      };

      const fetchCurrentUser = async () => {
        try {
          const currentUser = await getUser();
          setCurrentUser(currentUser);
          await AsyncStorage.setItem("currentUser", JSON.stringify(currentUser));
          console.log("currentUser", currentUser);
        } catch (error) {
          console.error("Error fetching current user:", error);
        }
      };

      const fetchFirstImage = async () => {
        const response = await GetItemFirstImage("3b883edcb3024669befb171954b60334");
        console.log("First image response", response);
      }

      fetchData();
      checkAuthentication();
      fetchCurrentUser();
      fetchFirstImage();
    }, [])
  );

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}
    >
      <VStack>
        <ScreenHeader title="São Paulo, SP" iconButton />

        {isUserAuthenticated && (
          <Text fontFamily="$heading" fontSize="$lg" color="$textDark800" px={16} mt={16}>
            {
              currentUser ? `Olá, ${currentUser.items[0].personal_name}` : "Olá, usuário"
            }
          </Text>
        )}

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

        {itemData ? (
          itemData.length > 0 ? (
            <SectionList
              scrollEnabled={false}
              sections={[
                {
                  title: "Produtos Principais",
                  data: itemData.map(item => ({
                    id: item.id,
                    title: item.name,
                    rating: 5,
                    ratingCount: 5,
                    price: item.daily_value.toFixed(2).replace('.', ','),
                    discountPrice: item.daily_value.toFixed(2).replace('.', ','),
                    images: item.images,
                  })),
                },
              ]}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => null}
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
                        onPress={() => navigation.navigate("productDetails", { id: item.id })}
                      >
                        <ProductCard
                          imagePath={item.images && item.images.links.length > 0 ? baseURL + item.images.links[0] : ''}
                          title={item.title}
                          price={item.price}
                          discountPrice={item.discountPrice}
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
            />
          ) : null
        ) : (
          <Text fontFamily="$heading" fontSize="$lg" color="$textDark800" px={16} mt={16}>
            Carregando...
          </Text>
        )}


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
