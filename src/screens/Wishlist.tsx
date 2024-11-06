import { Button } from "@components/Button";
import { ScreenHeader } from "@components/ScreenHeader";
import { ItemCard } from "@components/ItemCard";
import { Box, VStack, View } from "@gluestack-ui/themed";
import { FlatList, ScrollView } from "react-native";
import eletronicsImage from "@assets/eletronics.jpg";
import { useModal } from "@contexts/ModalContext";

export function Wishlist() {
  const { showModal, getActionMessage } = useModal();

  function handleDeleteAllItemsFromWishlist() {

  }

  const handleOpenModal = (action: "deleteAllItemsFromWishlist") => {
    const actionMessage = getActionMessage(action);
    const onConfirm = action === "deleteAllItemsFromWishlist" ? handleDeleteAllItemsFromWishlist : () => { };

    showModal({
      ...actionMessage,
      onConfirm,
    });
  };

  return (
    <View flex={1}>
      <ScreenHeader title="Lista de desejos" backButton />

      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 16, paddingBottom: 16, marginTop: 16 }} showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
        <FlatList
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          data={[
            { id: '1', title: 'Smartphone Samsung Galaxy S21', description: 'Smartphone Samsung Galaxy S21 128GB 5G', price: 3999 },
            { id: '2', title: 'Smartwatch Samsung Galaxy Watch 4', description: 'Smartwatch Samsung Galaxy Watch 4 44mm Bluetooth', price: 3999 },
            { id: '3', title: 'Notebook Dell Inspiron 15', description: 'Notebook Dell Inspiron 15 3000, Intel Core i5-1035G1', price: 3999 },
            { id: '4', title: 'Smart TV LG 50" 4K', description: 'Smart TV LG 50" 4K UHD LED 50UP7500PSB ThinQ AI ', price: 3999 },
            { id: '1', title: 'Smartphone Samsung Galaxy S21', description: 'Smartphone Samsung Galaxy S21 128GB 5G', price: 3999 },
            { id: '2', title: 'Smartwatch Samsung Galaxy Watch 4', description: 'Smartwatch Samsung Galaxy Watch 4 44mm Bluetooth', price: 3999 },
          ]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <VStack>
              <ItemCard
                id={item.id}
                type="product"
                title={item.title}
                description={item.description}
                price={item.price.toFixed(2).replace('.', ',')}
                imagesPaths={eletronicsImage}
              />
            </VStack>
          )}
          ItemSeparatorComponent={() => <VStack height={16} />}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      </ScrollView>

      <Box bg="$backgroundLight50" p={16} hardShadow="5">
        <Button title="Remover todos" buttonVariant="danger-outline" onPress={() => handleOpenModal("deleteAllItemsFromWishlist")} />
      </Box>
    </View>
  )
}