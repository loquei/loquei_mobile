import { Box, Text, VStack, HStack } from "@gluestack-ui/themed";
import { gluestackUIConfig } from '../../config/gluestack-ui.config';

export default function CalendarLegend() {
  const tokens = gluestackUIConfig.tokens;

  return (
    <Box mx={16} p={16} mt={16} rounded={"$md"} backgroundColor="$white">
      <Text fontFamily="$body" fontSize="$md" color="$textDark800">
        Legenda
      </Text>

      <VStack mt={2} gap={8}>
        <HStack alignItems="center" gap={8}>
          <Box
            width={25}
            height={25}
            borderRadius={4}
            backgroundColor={tokens.colors.secondary200}
            opacity={0.3}
            borderColor="$secondary800"
            borderWidth={1}
          />
          <Text fontFamily="$body" fontSize="$sm" color="$textDark800">
            Não selecionável
          </Text>
        </HStack>

        <HStack alignItems="center" gap={8}>
          <Box
            width={25}
            height={25}
            borderRadius={4}
            backgroundColor={tokens.colors.white}
            borderColor="$secondary800"
            borderWidth={1}
          />
          <Text fontFamily="$body" fontSize="$sm" color="$textDark800">
            Disponível
          </Text>
        </HStack>

        <HStack alignItems="center" gap={8}>
          <Box
            width={25}
            height={25}
            borderRadius={4}
            backgroundColor={tokens.colors.red300}
            borderColor="$secondary800"
            borderWidth={1}
          />
          <Text fontFamily="$body" fontSize="$sm" color="$textDark800">
            Indisponível
          </Text>
        </HStack>

        <HStack alignItems="center" gap={8}>
          <Box
            width={25}
            height={25}
            borderRadius={4}
            backgroundColor={tokens.colors.green100}
            borderColor="$secondary800"
            borderWidth={1}
          />
          <Text fontFamily="$body" fontSize="$sm" color="$textDark800">
            Intervalo de datas selecionado
          </Text>
        </HStack>

        <HStack alignItems="center" gap={8}>
          <Box
            width={25}
            height={25}
            borderRadius={4}
            backgroundColor={tokens.colors.teal600}
            borderColor="$secondary800"
            borderWidth={1}
          />
          <Text fontFamily="$body" fontSize="$sm" color="$textDark800">
            Início ou término do intervalo selecionado
          </Text>
        </HStack>
      </VStack>
    </Box>
  )
}