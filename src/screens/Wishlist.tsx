import { Button } from "@components/Button";
import { ScreenHeader } from "@components/ScreenHeader";
import { ItemCard } from "@components/ItemCard";
import { Box, VStack, View, Text } from "@gluestack-ui/themed";
import { FlatList, ScrollView } from "react-native";
import { useModal } from "@contexts/ModalContext";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { listWishlistItems } from "../api/listWishlistItems";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loading } from "@components/Loading";
import { AppSecondaryNavigatorRoutesProps } from "@routes/app.secondary.routes";
import { baseURL } from "../constants/authentications";
import { deleteWishlistItem } from "../api/deleteWishlistItem";

interface WishlistItem {
  item_id: string;
  name: string;
  description: string;
  daily_value: number;
  item_image_path: string;
}

export function Wishlist() {
  const { showModal, getActionMessage } = useModal();
  const navigation = useNavigation<AppSecondaryNavigatorRoutesProps>();

  const [currentUserId, setCurrentUserId] = useState<string>("");
  const queryClient = useQueryClient();

  const fetchWishlistItems = async () => {
    if (currentUserId) {
      try {
        const items = await listWishlistItems(currentUserId);
        return items || [];
      } catch (error) {
        console.error("Erro ao buscar itens da lista de desejos:", error);
        return [];
      }
    }
    return [];
  };

  useFocusEffect(
    useCallback(() => {
      const loadCurrentUserAndWishlist = async () => {
        try {
          const currentUser = await AsyncStorage.getItem("currentUser");
          if (currentUser) {
            const parsedUser = JSON.parse(currentUser);
            if (parsedUser && parsedUser.items[0]?.id) {
              setCurrentUserId(parsedUser.items[0].id);
            }
          }
        } catch (error) {
          console.error("Erro ao buscar o usuário atual:", error);
        }
        await fetchWishlistItems();
      };

      loadCurrentUserAndWishlist();
      refetch();
    }, [currentUserId])
  );

  const { data: wishlistItems = [], isLoading, error, refetch } = useQuery({
    queryKey: ["wishlistItems", currentUserId],
    queryFn: fetchWishlistItems,
    enabled: !!currentUserId,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  const handleOpenModal = (
    action: "deleteAllItemsFromWishlist" | "deleteUniqueItemFromWishlist",
    itemId?: string
  ) => {
    const actionMessage = getActionMessage(action);
    const onConfirm = action === "deleteAllItemsFromWishlist"
      ? () => handleDeleteAllItemsFromWishlist(currentUserId)
      : () => itemId && handleDeleteUniqueItemFromWishlist(currentUserId, itemId);

    showModal({
      ...actionMessage,
      onConfirm,
    });
  };


  const handleUserToHome = () => {
    navigation.navigate("home");
  };

  const handleDeleteUniqueItemFromWishlist = async (userId: string, itemId: string) => {
    try {
      await deleteWishlistItem(userId, itemId);
      queryClient.invalidateQueries({ queryKey: ["wishlistItems", currentUserId] });
    } catch (error) {
      console.error("Erro ao excluir o item da lista de desejos:", error);
    }
  };

  const handleDeleteAllItemsFromWishlist = async (userId: string) => {
    try {
      for (const item of wishlistItems) {
        await deleteWishlistItem(currentUserId, item.item_id);
      }
      queryClient.invalidateQueries({ queryKey: ["wishlistItems", currentUserId] });
    } catch (error) {
      console.error("Erro ao excluir todos os itens da lista de desejos:", error);
    }
  };

  if (isLoading) {
    return (
      <View flex={1} justifyContent="center" alignItems="center">
        <Loading />
      </View>
    );
  }

  if (error) {
    return (
      <View p={16} flex={1} justifyContent="center" alignItems="center">
        <Text textAlign="center" fontSize="$2xl" fontFamily="$heading" color="red.500">
          Erro ao carregar a lista de desejos.
        </Text>
        <Button title="Tentar novamente" onPress={() => refetch()} mt={16} />
      </View>
    );
  }

  return (
    <View flex={1}>
      <ScreenHeader title="Lista de desejos" backButton />

      {wishlistItems.length === 0 ? (
        <View p={16} flex={1} justifyContent="center">
          <Text textAlign="center" fontSize="$2xl" fontFamily="$heading" color="gray.500">
            Sua lista de desejos está vazia.
          </Text>
          <Text textAlign="center" fontSize="$lg" color="gray.500">
            Volte para a tela inicial e adicione produtos.
          </Text>
          <Button title="Voltar para a tela inicial" onPress={handleUserToHome} mt={16} />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 16, paddingBottom: 16, marginTop: 16 }}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
        >
          <FlatList
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            data={wishlistItems}
            keyExtractor={(item: WishlistItem) => item.item_id}
            renderItem={({ item }) => (
              <VStack>
                <ItemCard
                  key={item.item_id}
                  id={item.item_id}
                  type="product"
                  title={item.name}
                  description={item.description}
                  price={item.daily_value.toFixed(2).replace('.', ',')}
                  imagesPaths={baseURL + item.item_image_path}
                  hasRemoveButton
                  onRemove={() => handleOpenModal("deleteUniqueItemFromWishlist", item.item_id)}
                />
              </VStack>
            )}
            ItemSeparatorComponent={() => <VStack height={16} />}
            contentContainerStyle={{ paddingBottom: 16 }}
          />
        </ScrollView>
      )}

      {wishlistItems.length > 0 && (
        <Box bg="$backgroundLight50" p={16} hardShadow="5">
          <Button title="Remover todos" buttonVariant="danger-outline" onPress={() => handleOpenModal("deleteAllItemsFromWishlist")} />
        </Box>
      )}
    </View>
  );
}