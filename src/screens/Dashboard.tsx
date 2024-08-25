import { ScreenHeader } from "@components/ScreenHeader";
import { VStack } from "@gluestack-ui/themed";

export function Dashboard() {
  return (
    <VStack>
      <ScreenHeader title="Sua dashboard" backButton iconButton />
    </VStack>
  )
}