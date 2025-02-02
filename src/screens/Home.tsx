import { CategoryCard } from "@components/CategoryCard";
import { Tag } from "@components/Tag";
import { ProductCard } from "@components/ProductCard";
import { ScreenHeader } from "@components/ScreenHeader";
import { HStack, VStack, Text, Pressable, Center } from "@gluestack-ui/themed";

import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { useCallback, useEffect, useState } from "react";
import { BackHandler, FlatList, ScrollView, SectionList } from "react-native";
import { ListItems } from "../api/listItems";
import { IGetItem } from "../@types/TItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUser } from "../api/getUser";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "@components/Loading";
import { baseURL } from "../constants/authentications";
import { Button } from "@components/Button";
import { AppSecondaryNavigatorRoutesProps } from "@routes/app.secondary.routes";
import { ListCategories } from "../api/listCategory";
import { ICategories } from "../@types/TCategories";
import { ListRecentlyViewedItems } from "../api/listRecentlyViewedItems";
import { useCategoryId } from "@contexts/CategoryIdContext";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

export function Home() {
  const [itemData, setItemData] = useState<IGetItem[]>([]);
  const [recentlyViewedData, setRecentlyViewedData] = useState<IGetItem[]>([]);
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const secondaryNavigation = useNavigation<AppSecondaryNavigatorRoutesProps>();
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [categorySelected, setCategorySelected] = useState("");
  const { setCategoryId } = useCategoryId();
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>();
  const authNavigation = useNavigation<AuthNavigatorRoutesProps>();

  const {
    data: mainItems,
    isLoading: isLoadingMainItems,
    error: errorMainItems,
    refetch: refetchMainItems,
  } = useQuery({
    queryKey: ["mainItems"],
    queryFn: ListItems,
  });

  const { data: listCategory } = useQuery({
    queryKey: ["categories"],
    queryFn: ListCategories,
  });

  const {
    data: recentlyViewedItems,
    isLoading: isLoadingRecentlyViewed,
    error: errorRecentlyViewed,
    refetch: refetchRecentlyViewed,
  } = useQuery({
    queryKey: ["recentlyViewedItems"],
    queryFn: ListRecentlyViewedItems,
  });

  useEffect(() => {
    if (mainItems && recentlyViewedItems && listCategory) {
      setItemData(mainItems);
      setRecentlyViewedData(recentlyViewedItems);
      setCategories(listCategory);
    }
  }, [mainItems, recentlyViewedItems, listCategory]);

  useFocusEffect(
    useCallback(() => {
      const checkAuthentication = async () => {
        const authToken = await AsyncStorage.getItem("AuthToken");
        console.log("authToken", authToken);
        setIsUserAuthenticated(!!authToken);

        if (!authToken) {
          authNavigation.navigate("onBoarding");
        }
      };

      const fetchCurrentUser = async () => {
        try {
          const currentUser = await getUser();
          if (currentUser.status >= 400 && currentUser.status <= 499) {
            authNavigation.navigate("onBoarding");
          }
          setCurrentUser(currentUser);
          await AsyncStorage.setItem(
            "currentUser",
            JSON.stringify(currentUser)
          );
          console.log("currentUser", currentUser);
        } catch (error) {
          console.error("Error fetching current user:", error);
          authNavigation.navigate("onBoarding");
        }
      };

      const backAction = () => {
        const state = secondaryNavigation.getState();
        const currentRoute = state.routes[state.index].name;
        console.log("currentRoute", currentRoute);

        if (currentRoute === "home") {
          BackHandler.exitApp();
          return true;
        }
        return false;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      checkAuthentication();
      fetchCurrentUser();
      refetchMainItems();
      refetchRecentlyViewed();

      return () => backHandler.remove();
    }, [refetchMainItems, refetchRecentlyViewed, secondaryNavigation])
  );

  if (isLoadingMainItems || isLoadingRecentlyViewed) {
    return <Loading />;
  }

  if (errorMainItems || errorRecentlyViewed) {
    return (
      <VStack flex={1}>
        <ScreenHeader title="Loquei" />
        <Center flex={1} px={16}>
          <Text fontFamily="$heading" fontSize="$lg" color="$textDark800">
            Erro ao carregar os dados
          </Text>

          <Button title="Tentar novamente" onPress={() => refetchMainItems()} />
        </Center>
      </VStack>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}
    >
      <VStack>
        <ScreenHeader brandTitle="Loquei" />

        {isUserAuthenticated && (
          <Text
            fontFamily="$heading"
            fontSize="$lg"
            color="$textDark800"
            px={16}
          >
            {currentUser
              ? `Olá, ${currentUser.items[0].personal_name}`
              : "Olá, usuário"}
          </Text>
        )}

        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Tag
              name={item.name}
              isActive={
                categorySelected.toLowerCase() === item.name.toLocaleLowerCase()
              }
              onPress={() => {
                setCategoryId({ name: item.name, id: item.id });
                navigation.navigate("searchCategory");
              }}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          style={{
            marginTop: 16,
            marginBottom: 8,
            maxHeight: 44,
            minHeight: 44,
          }}
        />

        {itemData ? (
          itemData.length > 0 ? (
            <SectionList
              scrollEnabled={false}
              sections={[
                {
                  title: "Produtos Principais",
                  data: itemData.map((item) => ({
                    id: item.id,
                    title: item.name,
                    rating: item.score,
                    ratingCount: item.score,
                    price: item.daily_value.toFixed(2).replace(".", ","),
                    discountPrice: item.daily_value
                      .toFixed(2)
                      .replace(".", ","),
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
                        onPress={() =>
                          navigation.navigate("productDetails", { id: item.id })
                        }
                      >
                        <ProductCard
                          imagePath={
                            item.images && item.images?.links.length > 0
                              ? baseURL + item.images.links[0]
                              : ""
                          }
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
          <Text
            fontFamily="$heading"
            fontSize="$lg"
            color="$textDark800"
            textAlign="center"
            my={16}
          >
            Nenhum produto encontrado.
          </Text>
        )}

        {recentlyViewedData ? (
          recentlyViewedData.length > 0 ? (
            <SectionList
              scrollEnabled={false}
              sections={[
                {
                  title: "Vistos recentemente",
                  data: recentlyViewedData.map((item) => ({
                    id: item.id,
                    title: item.name,
                    rating: item.score,
                    ratingCount: item.score,
                    price: item.daily_value.toFixed(2).replace(".", ","),
                    discountPrice: item.daily_value
                      .toFixed(2)
                      .replace(".", ","),
                    images: item.images,
                  })),
                },
              ]}
              style={{ marginTop: 16 }}
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
                        onPress={() =>
                          navigation.navigate("productDetails", { id: item.id })
                        }
                      >
                        <ProductCard
                          imagePath={
                            item.images && item.images?.links.length > 0
                              ? baseURL + item.images.links[0]
                              : ""
                          }
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
          <Text
            fontFamily="$heading"
            fontSize="$lg"
            color="$textDark800"
            textAlign="center"
            my={16}
          >
            Nenhum produto visualizado recentemente.
          </Text>
        )}

        <SectionList
          scrollEnabled={false}
          sections={[
            {
              title: "Explore",
              data: categories.slice(0, 3),
            },
          ]}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CategoryCard name={item.name} icon={item.name} id={item.id} />
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
          renderSectionFooter={() => (
            <Pressable
              onPress={() => secondaryNavigation.navigate("search")}
              py={8}
              px={16}
            >
              <Text
                fontFamily="$body"
                fontSize="$lg"
                color="$teal600"
                textAlign="center"
              >
                Ver todas
              </Text>
            </Pressable>
          )}
          ItemSeparatorComponent={() => <HStack height={10} />}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          style={{ marginTop: 16 }}
        />

        <Text
          fontFamily="$body"
          fontSize="$sm"
          color="$textDark800"
          textAlign="center"
          my={16}
          px={16}
        >
          © 2024 Loquei. Todos os direitos reservados.
        </Text>
      </VStack>
    </ScrollView>
  );
}
