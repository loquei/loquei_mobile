import { ScreenHeader } from "@components/ScreenHeader";
import { gluestackUIConfig } from "@gluestack-ui/config";
import { Box, Divider, HStack, Heading, Pressable, Text, VStack, View } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { Bell, ChevronRight, User, MapPin, LockKeyhole, CircleDollarSign, CircleHelp, Info } from "lucide-react-native";
import { TouchableOpacity } from "react-native";

export function Profile() {
  const { tokens } = gluestackUIConfig;
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleToLeasing() {
    navigation.navigate('leasing');
  }

  return (
    <VStack>
      <ScreenHeader title="Perfil" backButton />

      <VStack justifyContent="center" alignItems="center" px={16} mt={16}>
        <View width={100} height={100} bg="$backgroundLight400" borderRadius="$full" />
        <Heading color="$textDark800" fontSize="$xl" fontFamily="$heading" textAlign="center">John Doe</Heading>
        <TouchableOpacity>
          <Text color="$teal600" fontSize="$sm" fontFamily="$heading">Trocar foto</Text>
        </TouchableOpacity>
      </VStack>

      <VStack mt={16} px={16}>
        <Box mt={16} bg="$white" width="$full" rounded={"$md"}>

          <Pressable $active-backgroundColor="$backgroundLight100">
            <HStack justifyContent="space-between" p={16} alignItems="center">
              <HStack alignItems="center" gap={16}>
                <User size={24} color={tokens.colors.textDark800} />
                <Text color="$textDark800" fontSize="$md" fontFamily="$body">Conta</Text>
              </HStack>
              <ChevronRight size={24} color={tokens.colors.textDark800} />
            </HStack>
          </Pressable>
          <Divider />

          <Pressable $active-backgroundColor="$backgroundLight100">
            <HStack justifyContent="space-between" p={16} alignItems="center">
              <HStack alignItems="center" gap={16}>
                <MapPin size={24} color={tokens.colors.textDark800} />
                <Text color="$textDark800" fontSize="$md" fontFamily="$body">Endereços</Text>
              </HStack>
              <ChevronRight size={24} color={tokens.colors.textDark800} />
            </HStack>
          </Pressable>
          <Divider />

          <Pressable $active-backgroundColor="$backgroundLight100">
            <HStack justifyContent="space-between" p={16} alignItems="center">
              <HStack alignItems="center" gap={16}>
                <Bell size={24} color={tokens.colors.textDark800} />
                <Text color="$textDark800" fontSize="$md" fontFamily="$body">Notificações</Text>
              </HStack>
              <ChevronRight size={24} color={tokens.colors.textDark800} />
            </HStack>
          </Pressable>
          <Divider />

          <Pressable $active-backgroundColor="$backgroundLight100">
            <HStack justifyContent="space-between" p={16} alignItems="center">
              <HStack alignItems="center" gap={16}>
                <LockKeyhole size={24} color={tokens.colors.textDark800} />
                <Text color="$textDark800" fontSize="$md" fontFamily="$body">Privacidade</Text>
              </HStack>
              <ChevronRight size={24} color={tokens.colors.textDark800} />
            </HStack>
          </Pressable>
          <Divider />

          <Pressable $active-backgroundColor="$backgroundLight100" onPress={handleToLeasing}>
            <HStack justifyContent="space-between" p={16} alignItems="center">
              <HStack alignItems="center" gap={16}>
                <CircleDollarSign size={24} color={tokens.colors.textDark800} />
                <Text color="$textDark800" fontSize="$md" fontFamily="$body">Locar produtos</Text>
              </HStack>
              <ChevronRight size={24} color={tokens.colors.textDark800} />
            </HStack>
          </Pressable>
          <Divider />

          <Pressable $active-backgroundColor="$backgroundLight100">
            <HStack justifyContent="space-between" p={16} alignItems="center">
              <HStack alignItems="center" gap={16}>
                <CircleHelp size={24} color={tokens.colors.textDark800} />
                <Text color="$textDark800" fontSize="$md" fontFamily="$body">Ajuda</Text>
              </HStack>
              <ChevronRight size={24} color={tokens.colors.textDark800} />
            </HStack>
          </Pressable>
          <Divider />

          <Pressable $active-backgroundColor="$backgroundLight100">
            <HStack justifyContent="space-between" p={16} alignItems="center">
              <HStack alignItems="center" gap={16}>
                <Info size={24} color={tokens.colors.textDark800} />
                <Text color="$textDark800" fontSize="$md" fontFamily="$body">Sobre</Text>
              </HStack>
              <ChevronRight size={24} color={tokens.colors.textDark800} />
            </HStack>
          </Pressable>
        </Box>
      </VStack>
    </VStack>
  )
}