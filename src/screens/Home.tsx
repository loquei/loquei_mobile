import { CategoryCard } from "@components/CategoryCard";
import { Tag } from "@components/Tag";
import { ProductCard } from "@components/ProductCard";
import { ScreenHeader } from "@components/ScreenHeader";
import { HStack, VStack, Text, Pressable, Center } from "@gluestack-ui/themed";

import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { useCallback, useEffect, useState } from "react";
import { FlatList, ScrollView, SectionList } from "react-native";
import { ListItems } from "../api/listItems";
import { IGetItem } from "../@types/TItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUser } from "../api/getUser";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "@components/Loading";
import { baseURL } from "../constants/authentications";
import { ListCategories } from "../api/listCategory";
import { ICategories } from "../@types/TCategories";
import { useCategoryId } from "@contexts/CategoryIdContext";
export function Home() {
  const { setCategoryId } = useCategoryId();
  const [itemData, setItemData] = useState<IGetItem[]>([]);
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [categorySelected, setCategorySelected] = useState("");
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["items"],
    queryFn: ListItems,
  });
  const { data: ListCategory } = useQuery({
    queryKey: ["categories"],
    queryFn: ListCategories,
  });

  useEffect(() => {
    if (data && ListCategory) {
      setItemData(data);
      setCategories(ListCategory);
    }
  }, [data]);

  useFocusEffect(
    useCallback(() => {
      const checkAuthentication = async () => {
        const authToken = await AsyncStorage.getItem("AuthToken");
        console.log("authToken", authToken);
        setIsUserAuthenticated(!!authToken);
      };

      const fetchCurrentUser = async () => {
        try {
          const currentUser = await getUser();
          setCurrentUser(currentUser);
          await AsyncStorage.setItem(
            "currentUser",
            JSON.stringify(currentUser)
          );
          console.log("currentUser", currentUser);
        } catch (error) {
          console.error("Error fetching current user:", error);
        }
      };

      checkAuthentication();
      fetchCurrentUser();

      refetch();
    }, [refetch])
  );

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <VStack flex={1}>
        <ScreenHeader title="São Paulo, SP" iconButton />
        <Center>
          <Text fontFamily="$heading" fontSize="$lg" color="$textDark800">
            Erro ao carregar os dados
          </Text>
          <Text fontFamily="$body" fontSize="$md" color="$textDark800">
            Tente novamente mais tarde
          </Text>
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
        <ScreenHeader title="Loquei" iconButton />

        {isUserAuthenticated && (
          <Text
            fontFamily="$heading"
            fontSize="$lg"
            color="$textDark800"
            px={16}
            mt={16}
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
                setCategoryId({ id: item.id, name: item.name });
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
                    rating: 5,
                    ratingCount: 5,
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
                            item.images && item.images.links?.length > 0
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
            px={16}
            mt={16}
          >
            Carregando...
          </Text>
        )}

        <SectionList
          scrollEnabled={false}
          sections={[
            {
              title: "Explore",
              data: categories,
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
