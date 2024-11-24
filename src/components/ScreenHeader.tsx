import { gluestackUIConfig } from "../../config/gluestack-ui.config";
import { Heading, Text } from "@gluestack-ui/themed";
import { HStack } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import logoImage from "@assets/logo.png";

import { Bell, ChevronLeft } from 'lucide-react-native'
import { Image } from "@gluestack-ui/themed";

interface HeaderProps {
  title?: string
  brandTitle?: string
  backButton?: boolean
  iconButton?: boolean
}

export function ScreenHeader({ title, brandTitle, backButton, iconButton }: HeaderProps) {
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }


  const { tokens } = gluestackUIConfig
  return (
    <>
      {brandTitle ? (
        <HStack bg="$backgroundLight50" px={16} paddingVertical={12} alignItems="center">
          <HStack flex={1} gap={8}>
            <Image source={logoImage} alt="Logo" width={40} height={40} />

            <Text color="$teal600" fontSize="$2xl" fontFamily="$heading" textAlign="center">
              {brandTitle}
            </Text>
          </HStack>
        </HStack>
      ) : (
        <HStack bg="$teal600" px={16} paddingVertical={12} alignItems="center">
          <HStack width={24} justifyContent="center">
            {backButton && (
              <ChevronLeft size={24} color={tokens.colors.white} onPress={handleGoBack} />
            )}
          </HStack>

          <Text flex={1} color="$white" fontSize="$xl" fontFamily="$mono" textAlign="center">
            {title}
          </Text>

          <HStack width={24} justifyContent="center">
            {iconButton && <Bell size={24} color={tokens.colors.white} />}
          </HStack>
        </HStack>
      )}
    </>
  );
}