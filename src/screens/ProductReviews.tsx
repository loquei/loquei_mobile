import { VStack, Text } from "@gluestack-ui/themed";
import { ProductContainerReviews } from '@components/ProductContainerReviews'
import { ScrollView } from "react-native";
import { ScreenHeader } from "@components/ScreenHeader";

export function ProductReviews() {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
      <VStack flex={1} pb={32}>
        <ScreenHeader title="Avaliações do produto" backButton />

        <ProductContainerReviews itemId="1" raterId="1" isItemOwner={false} isAllRatingsScreen />
      </VStack>
    </ScrollView>
  )
}