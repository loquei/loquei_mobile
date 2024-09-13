import { gluestackUIConfig } from "@gluestack-ui/config";
import { Heading, Text } from "@gluestack-ui/themed";
import { HStack } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";

import { Bell, ChevronLeft } from 'lucide-react-native'

interface HeaderProps {
  title: string
  backButton?: boolean
  iconButton?: boolean
}

export function ScreenHeader({ title, backButton, iconButton }: HeaderProps) {
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }


  const { tokens } = gluestackUIConfig
  return (
    <HStack bg="$teal600" px={16} paddingVertical={12} alignItems="center">
      <HStack width={24}>
        {backButton &&
          <ChevronLeft size={24} color={tokens.colors.white} onPress={handleGoBack} />
        }
      </HStack>
      <Text flex={1} color="$white" fontSize="$xl" fontFamily="$mono" textAlign="center">
        {title}
      </Text>
      <HStack width={24}>
        {iconButton && <Bell size={24} color={
          tokens.colors.white
        } />}
      </HStack>
    </HStack>
  )
}