import { ScreenHeader } from "@components/ScreenHeader";
import { gluestackUIConfig } from "@gluestack-ui/config";
import { VStack, Text, Box, Pressable, HStack } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { Plus } from "lucide-react-native";

export function Address() {
  const { tokens } = gluestackUIConfig;
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const handleToLeasing = () => {
    navigation.navigate("leasing");
  };

  return (
    <VStack>
      <ScreenHeader title="Endereço" backButton />
      <Box mt={16} bg="$white" width="$full" rounded={"$md"}>
        <Pressable
          $active-backgroundColor="$backgroundLight100"
          onPress={handleToLeasing}
        >
          <HStack justifyContent="space-between" p={16} alignItems="center">
            <HStack alignItems="center" gap={16}>
              <Plus size={24} color={tokens.colors.textDark800} />
              <Text color="$textDark800" fontSize="$md" fontFamily="$body">
                Adicionar endereço
              </Text>
            </HStack>
          </HStack>
        </Pressable>
      </Box>
    </VStack>
  );
}
