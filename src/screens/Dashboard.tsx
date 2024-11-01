import { Button } from "@components/Button";
import { ScreenHeader } from "@components/ScreenHeader";
import { SearchInput } from "@components/SearchInput";
import { Box, HStack, Text, VStack, View } from "@gluestack-ui/themed";

import { Plus, SquareMenu } from "lucide-react-native";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";
import { ItemCard } from "@components/ItemCard";
import { FlatList, ScrollView } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { useCallback, useState } from "react";
import { IGetItem } from "../@types/TItem";
import { ListMyItems } from "../api/listMyItems";
import { ListItems } from "../api/listItem";

export function Dashboard() {
  const { tokens } = gluestackUIConfig;
  const [itemData, setItemData] = useState<IGetItem[]>([]);
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

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const data = await ListMyItems();
        if (data) {
          setItemData(data);
          console.log("data", data);
        }
      };

      fetchData();
    }, [])
  );

  return (
    <VStack flex={1}>
      <ScreenHeader title="Sua dashboard" backButton iconButton />

      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 32,
          marginTop: 16,
        }}
      >
        <SearchInput />

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
              24
            </Text>
            <Text fontFamily="$body" fontSize={"$sm"} color="$textLight600">
              Negociações
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
              12
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
            <Text fontFamily="$heading" fontSize="$xl" color="$textDark800">
              R$ 12.000
            </Text>
            <Text fontFamily="$body" fontSize={"$sm"} color="$textLight600">
              Receita
            </Text>
          </Box>
        </HStack>

        <HStack gap={8} mt={8} justifyContent="center">
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
              22
            </Text>
            <Text fontFamily="$body" fontSize={"$sm"} color="$textLight600">
              Feedbacks
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
              4.8/5
            </Text>
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
              320
            </Text>
            <Text fontFamily="$body" fontSize={"$sm"} color="$textLight600">
              Estoque
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
          <Text fontFamily="$heading" fontSize="$lg" color="$textDark800">
            Seus produtos
          </Text>

          <FlatList
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            data={itemData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <VStack>
                <ItemCard
                  id={item.id}
                  type="product"
                  title={item.name}
                  description={item.description}
                  price={item.daily_value.toFixed(2).replace('.', ',')}
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
        </VStack>
      </ScrollView>
    </VStack>
  );
}
