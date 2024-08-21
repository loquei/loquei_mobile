import { Image, Text, VStack } from "@gluestack-ui/themed";
import eletronicsImage from '@assets/eletronics.jpg'

import { Star } from 'lucide-react-native'
import { gluestackUIConfig } from "../../config/gluestack-ui.config";
import { HStack } from "@gluestack-ui/themed";

interface ProductCardProps {
  title: string;
  rating: number;
  ratingCount: number;
  price?: string;
  discountPrice?: string;
}

export function ProductCard({ title, rating, ratingCount, price, discountPrice }: ProductCardProps) {
  const { tokens } = gluestackUIConfig
  return (
    <VStack flex={1} w={160} bg="$white" rounded="$2xl">
      <Image source={eletronicsImage} alt="Eletrônicos" w={160} h={120} style={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }} />

      <VStack flex={1} p={12} justifyContent="space-between">
        <VStack>
          <Text fontFamily="$mono" numberOfLines={3} color="$textDark800">
            {title}
          </Text>

        </VStack>

        <VStack>
          <HStack alignItems="center" gap={4}>
            <Text fontFamily="$mono" fontSize="$sm" color="$textDark600">
              {rating.toFixed(1)}
            </Text>
            <Star size={16} fill={tokens.colors.yellow500} />
            <Text fontFamily="$body" fontSize="$sm" color="$textDark600">
              ({ratingCount})
            </Text>
          </HStack>
          {
            price && discountPrice && (
              <>
                <Text fontFamily="$body" fontSize="$sm" color="$textDark600" textDecorationLine="line-through">
                  {price}
                </Text>
                <Text fontFamily="$mono" fontSize="$md" color="$teal600">
                  {discountPrice}
                </Text>
              </>
            )}
        </VStack>
      </VStack>
    </VStack>
  )
}