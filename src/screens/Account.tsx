import { ScreenHeader } from "@components/ScreenHeader";
import { gluestackUIConfig } from "@gluestack-ui/config";
import { VStack, Text, Box, Pressable, HStack } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { Trash2 } from "lucide-react-native";
import { deleteUser } from "../api/deleteUser";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

export function Account() {
  const { tokens } = gluestackUIConfig;
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const handleTonBoarding = () => {
    navigation.navigate("onBoarding");
  };

  const handleDeleteAccount = async () => {
    await deleteUser();
  };

  return (
    <VStack>
      <ScreenHeader title="Conta" backButton />
      <Box mt={16} bg="$white" width="$full" rounded={"$md"}>
        <Pressable
          $active-backgroundColor="$backgroundLight100"
          onPress={handleDeleteAccount}
        >
          <HStack justifyContent="space-between" p={16} alignItems="center">
            <HStack alignItems="center" gap={16}>
              <Trash2 size={24} color={tokens.colors.red400} />
              <Text color="$red500" fontSize="$md" fontFamily="$body">
                Deletar conta
              </Text>
            </HStack>
          </HStack>
        </Pressable>
      </Box>
    </VStack>
  );
}
