import { Button } from "@components/Button";
import { Modal } from "@components/Modal";
import { ScreenHeader } from "@components/ScreenHeader";
import { ItemCard } from "@components/ItemCard";
import { Box, VStack, View } from "@gluestack-ui/themed";
import { useRef, useState } from "react";
import { FlatList, ScrollView } from "react-native";

export function Wishlist() {
  const [showModal, setShowModal] = useState(false)
  const ref = useRef(null);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <View flex={1}>
      <ScreenHeader title="Lista de desejos" backButton />

      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 16, paddingBottom: 16, marginTop: 16 }} showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
        <FlatList
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          data={[
            { id: '1', title: 'Smartphone Samsung Galaxy S21', description: 'Smartphone Samsung Galaxy S21 128GB 5G', price: 'R$ 3.999,00' },
            { id: '2', title: 'Smartwatch Samsung Galaxy Watch 4', description: 'Smartwatch Samsung Galaxy Watch 4 44mm Bluetooth', price: 'R$ 3.999,00' },
            { id: '3', title: 'Notebook Dell Inspiron 15', description: 'Notebook Dell Inspiron 15 3000, Intel Core i5-1035G1', price: 'R$ 3.999,00' },
            { id: '4', title: 'Smart TV LG 50" 4K', description: 'Smart TV LG 50" 4K UHD LED 50UP7500PSB ThinQ AI ', price: 'R$ 3.999,00' },
            { id: '1', title: 'Smartphone Samsung Galaxy S21', description: 'Smartphone Samsung Galaxy S21 128GB 5G', price: 'R$ 3.999,00' },
            { id: '2', title: 'Smartwatch Samsung Galaxy Watch 4', description: 'Smartwatch Samsung Galaxy Watch 4 44mm Bluetooth', price: 'R$ 3.999,00' },
          ]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <VStack>
              <ItemCard type="product" title={item.title} description={item.description} price={item.price} hasRemoveButton />
            </VStack>
          )}
          ItemSeparatorComponent={() => <VStack height={16} />}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      </ScrollView>

      <Box bg="$backgroundLight50" p={16} hardShadow="5">
        <Button title="Remover todos" buttonVariant="danger-outline" onPress={handleOpenModal} />
      </Box>

      <Modal
        title="Remover lista de desejos"
        description="Tem certeza que deseja remover todos os produtos da lista de desejos? Essa ação não pode ser desfeita."
        confirmButtonText="Remover"
        isOpen={showModal}
        onClose={handleCloseModal}
        modalRef={ref}
      />
    </View>
  )
}