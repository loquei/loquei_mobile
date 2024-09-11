import { ScreenHeader } from "@components/ScreenHeader";
import { gluestackUIConfig } from "@gluestack-ui/config";
import {
  VStack,
  Text,
  Box,
  Pressable,
  HStack,
  Divider,
} from "@gluestack-ui/themed";
import { BellRing } from "lucide-react-native";
import { FlatList } from "react-native";

export function Notifications() {
  const { tokens } = gluestackUIConfig;
  const notifications = [
    "Notificacao1",
    "Notificacao2",
    "Notificacao3",
    "Notificacao4",
    "Notificacao5",
  ];
  return (
    <VStack>
      <ScreenHeader title="Notificações" backButton />
      <Box mb={16} />
      <FlatList
        data={notifications}
        keyExtractor={(item) => item}
        renderItem={({ item }) => {
          return (
            <Box bg="$white" width="$full" rounded={"$md"} mt={4}>
              <HStack justifyContent="space-between" p={16} alignItems="center">
                <HStack alignItems="center" gap={16}>
                  <BellRing size={24} color={tokens.colors.textDark800} />
                  <Text color="$textDark800" fontSize="$md" fontFamily="$body">
                    {item}
                  </Text>
                </HStack>
              </HStack>
              <Divider />
            </Box>
          );
        }}
        showsVerticalScrollIndicator={false}
      />
    </VStack>
  );
}
