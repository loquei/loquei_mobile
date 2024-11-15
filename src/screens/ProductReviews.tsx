import { VStack, Text } from "@gluestack-ui/themed";
import { ProductContainerReviews } from '@components/ProductContainerReviews'
import { ScrollView } from "react-native";
import { ScreenHeader } from "@components/ScreenHeader";
import { useRoute } from "@react-navigation/native";

export function ProductReviews() {
  const route = useRoute();
  const { itemId, raterId, isItemOwner } = route.params as { itemId: string, raterId: string, isItemOwner: boolean };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
      <VStack flex={1} pb={32}>
        <ScreenHeader title="Avaliações do produto" backButton />

        <ProductContainerReviews itemId={itemId} raterId={raterId} isItemOwner={isItemOwner} isAllRatingsScreen />
      </VStack>
    </ScrollView>
  )
}