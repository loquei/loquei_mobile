import { Button } from "@components/Button";
import { ScreenHeader } from "@components/ScreenHeader";
import { SearchInput } from "@components/SearchInput";
import { VStack, Text } from "@gluestack-ui/themed";
import { FlatList, ScrollView } from "react-native";
import { Plus } from "lucide-react-native";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";
import { ItemCard } from "@components/ItemCard";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ListMyItems } from "../api/listMyItems";
import { IGetItem } from "../@types/TItem";

export function UserProducts() {
  const { tokens } = gluestackUIConfig;
  const [itemData, setItemData] = useState<IGetItem[]>([]);
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleNavigateToAddProduct() {
    navigation.navigate("addProductStep1");
  }
  useEffect(() => {
    const fetchData = async () => {
      const data = await ListMyItems();
      if (data) {
        setItemData(data);
      }
    };
    fetchData();
  }, []);
  return (
    <VStack flex={1}>
      <ScreenHeader title="Meus produtos" backButton />

      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        contentContainerStyle={{ paddingHorizontal: 16, marginTop: 16 }}
      >
        <SearchInput />

        <Button
          title="Adicionar produto"
          mt={16}
          icon={<Plus size={24} color={tokens.colors.white} />}
          onPress={handleNavigateToAddProduct}
        />

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
                  price={item.daily_value.toString()}
                  hasRemoveButton
                  hasEditButton
                />
              </VStack>
            )}
            ItemSeparatorComponent={() => <VStack height={16} />}
            style={{ marginTop: 8 }}
          />
        </VStack>

        <VStack height={32} />
      </ScrollView>
    </VStack>
  );
}
