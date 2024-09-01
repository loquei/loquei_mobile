import { Button } from "@components/Button";
import { ScreenHeader } from "@components/ScreenHeader";
import { SearchInput } from "@components/SearchInput";
import { VStack, Text } from "@gluestack-ui/themed";
import { FlatList, ScrollView } from "react-native";
import { Plus } from 'lucide-react-native';
import { gluestackUIConfig } from "../../config/gluestack-ui.config";
import { ItemCard } from "@components/ItemCard";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { useNavigation } from "@react-navigation/native";

export function UserProducts() {
  const { tokens } = gluestackUIConfig;

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleNavigateToAddProduct() {
    navigation.navigate('addProductStep1');
  }

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
            data={[
              { id: '1', title: 'Smartphone Samsung Galaxy S21', description: 'Smartphone Samsung Galaxy S21 128GB 5G', price: 'R$ 3.999,00' },
              { id: '2', title: 'Smartwatch Samsung Galaxy Watch 4', description: 'Smartwatch Samsung Galaxy Watch 4 44mm Bluetooth', price: 'R$ 3.999,00' },
              { id: '3', title: 'Notebook Dell Inspiron 15', description: 'Notebook Dell Inspiron 15 3000, Intel Core i5-1035G1', price: 'R$ 3.999,00' },
              { id: '4', title: 'Smart TV LG 50" 4K', description: 'Smart TV LG 50" 4K UHD LED 50UP7500PSB ThinQ AI ', price: 'R$ 3.999,00' },
              { id: '5', title: 'Smartphone Samsung Galaxy S21', description: 'Smartphone Samsung Galaxy S21 128GB 5G', price: 'R$ 3.999,00' },
              { id: '6', title: 'Smartwatch Samsung Galaxy Watch 4', description: 'Smartwatch Samsung Galaxy Watch 4 44mm Bluetooth', price: 'R$ 3.999,00' },
            ]}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <VStack>
                <ItemCard type="product" title={item.title} description={item.description} price={item.price} hasRemoveButton hasEditButton />
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
