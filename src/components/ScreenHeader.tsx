import { gluestackUIConfig } from "@gluestack-ui/config";
import { Heading, Text } from "@gluestack-ui/themed";
import { HStack } from "@gluestack-ui/themed";

import { Bell, ChevronLeft } from 'lucide-react-native'

interface HeaderProps {
  title: string
  backButton?: boolean
  iconButton?: boolean
}

export function ScreenHeader({ title, backButton, iconButton }: HeaderProps) {
  const { tokens } = gluestackUIConfig
  return (
    <HStack bg="$backgroundLight50" px={16} mt={16} alignItems="center">
      {backButton &&
        <ChevronLeft size={24} color={tokens.colors.textDark800} />
      }
      <Heading flex={1} color="$textDark800" fontSize="$xl" fontFamily="$heading" textAlign="center">
        {title}
      </Heading>
      {iconButton && <Bell size={24} color={
        tokens.colors.textDark800
      } />}
    </HStack>
  )
}