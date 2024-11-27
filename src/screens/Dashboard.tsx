import { Button } from "@components/Button";
import { ScreenHeader } from "@components/ScreenHeader";
import { Box, Center, HStack, Text, VStack, View } from "@gluestack-ui/themed";
import { Plus, SquareMenu } from "lucide-react-native";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";
import { ItemCard } from "@components/ItemCard";
import { FlatList, ScrollView } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { useCallback, useEffect, useState } from "react";
import { IGetItem } from "../@types/TItem";
import { ListMyItems } from "../api/listMyItems";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "@components/Loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserById } from "../api/getUser";

interface User {
  id: string;
  user_name: string;
  personal_name: string;
  email: string;
  phone: string;
  document: string;
  birth: string;
  score: number;
  feedbacks_count: number;
  rentals_count: number;
  created_at: string;
  updated_at: string;
}

export function Dashboard() {
  const { tokens } = gluestackUIConfig;
  const [itemData, setItemData] = useState<IGetItem[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleNavigateToAddProduct() {
    navigation.navigate("addProductStep1");
  }

  function handleNavigateToAllOrders() {
    navigation.navigate("allOrders");
  }

  function handleNavigateToUserProducts() {
    navigation.navigate("userProducts");
  }

  const {
    data: MyItems,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["MyItems"],
    queryFn: () => ListMyItems(),
  });

  useEffect(() => {
    if (MyItems) {
      setItemData(MyItems);
    }
  }, [MyItems]);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const data = MyItems;
        if (data) {
          setItemData(data);
          console.log("data", data);
        }
      };

      fetchData();
      refetch();
    }, [refetch, MyItems])
  );

  useFocusEffect(
    useCallback(() => {
      const fetchCurrentUser = async () => {
        try {
          const currentUser = await AsyncStorage.getItem("currentUser");
          if (currentUser) {
            const parsedUser = JSON.parse(currentUser);
            if (parsedUser && parsedUser.items[0].id) {
              setCurrentUserId(parsedUser.items[0].id);
              const user = await getUserById(parsedUser.items[0].id);
              setUser(user);
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

      fetchCurrentUser();
    }, [])
  );

  if (isLoading || !user) {
    return <Loading />;
  }

  if (error) {
    return (
      <VStack flex={1}>
        <ScreenHeader title="Sua dashboard" backButton />
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

  console.log("CURRENT USER", user);

  return (
    <VStack flex={1}>
      <ScreenHeader title="Sua dashboard" backButton />

      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 32,
          marginTop: 16,
        }}
      >
        <HStack gap={8} mt={16} justifyContent="center">
          <Box
            bg="$white"
            rounded="$md"
            p={8}
            justifyContent="center"
            alignItems="center"
            flex={1}
            height={84}
          >
            <Text fontFamily="$heading" fontSize="$xl" color="$textDark800">
              {user.rentals_count}
            </Text>
            <Text fontFamily="$body" fontSize={"$sm"} color="$textLight600">
              Pedidos
            </Text>
          </Box>

          <Box
            bg="$white"
            rounded="$md"
            p={8}
            justifyContent="center"
            alignItems="center"
            flex={1}
            height={84}
          >
            {user.score ? (
              <Text fontFamily="$heading" fontSize="$xl" color="$textDark800">
                {user.score}
              </Text>
            ) : (
              <Text fontFamily="$heading" fontSize="$xl" color="$textDark800">
                Sem nota
              </Text>
            )}
            <Text fontFamily="$body" fontSize={"$sm"} color="$textLight600">
              Nota
            </Text>
          </Box>

          <Box
            bg="$white"
            rounded="$md"
            p={8}
            justifyContent="center"
            alignItems="center"
            flex={1}
            height={84}
          >
            <Text fontFamily="$heading" fontSize="$xl" color="$textDark800">
              {user.feedbacks_count}
            </Text>
            <Text fontFamily="$body" fontSize={"$sm"} color="$textLight600">
              Feedbacks
            </Text>
          </Box>
        </HStack>

        <VStack gap={16} mt={16}>
          <Button
            title="Adicionar produto"
            icon={<Plus size={20} color={tokens.colors.white} />}
            onPress={handleNavigateToAddProduct}
          />
          <Button
            title="Pedidos"
            buttonVariant="outline"
            icon={<SquareMenu size={20} color={tokens.colors.textDark800} />}
            onPress={handleNavigateToAllOrders}
          />
        </VStack>

        <VStack mt={16}>
          {itemData.length > 0 ? (
            <>
              <Text fontFamily="$heading" fontSize="$lg" color="$textDark800">
                Seus produtos
              </Text>

              <FlatList
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                data={itemData.slice(0, 3)}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <VStack>
                    <ItemCard
                      id={item.id}
                      type="product"
                      title={item.name}
                      description={item.description}
                      price={item.daily_value.toFixed(2).replace(".", ",")}
                      imagesPaths={item.images.links}
                    />
                  </VStack>
                )}
                ItemSeparatorComponent={() => <VStack height={16} />}
                style={{ marginTop: 8 }}
              />

              <Button
                title="Ver todos"
                buttonVariant="outline"
                mt={16}
                onPress={handleNavigateToUserProducts}
              />
            </>
          ) : (
            <Text fontFamily="$body" fontSize="$md" color="$textDark800" textAlign="center">
              Nenhum produto cadastrado
            </Text>
          )}
        </VStack>
      </ScrollView>
    </VStack>
  );
}