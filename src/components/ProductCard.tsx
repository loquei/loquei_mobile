import { Image, Text, VStack } from "@gluestack-ui/themed";
import eletronicsImage from '@assets/eletronics.jpg'

import { Star } from 'lucide-react-native'
import { gluestackUIConfig } from "../../config/gluestack-ui.config";
import { HStack } from "@gluestack-ui/themed";

export function ProductCard() {
  const { tokens } = gluestackUIConfig
  return (
    <VStack flex={1} w={160} bg="$white" rounded="$2xl">
      <Image source={eletronicsImage} alt="Eletrônicos" w={160} h={120} style={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }} />

      <VStack p={12}>
        <Text fontFamily="$mono" numberOfLines={3} color="$textDark800">
          Smartphone Samsung Galaxy S21
        </Text>

        <HStack alignItems="center" gap={4}>
          <Text fontFamily="$body" fontSize="$sm" color="$textDark600">
            4.8
          </Text>
          <Star size={16} fill={tokens.colors.yellow500} />
          <Text fontFamily="$body" fontSize="$sm" color="$textDark600">
            (12)
          </Text>
        </HStack>

        <VStack>
          <Text fontFamily="$body" fontSize="$sm" color="$textDark600" mt={1} ml={2} textDecorationLine="line-through">
            R$ 4.499,00
          </Text>
          <Text fontFamily="$mono" fontSize="$lg" color="$teal600" mt={1}>
            R$ 3.999,00
          </Text>
        </VStack>
      </VStack>
    </VStack>
  )
}