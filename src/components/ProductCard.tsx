import { Image, Text, VStack } from "@gluestack-ui/themed";
import eletronicsImage from "@assets/eletronics.jpg";

import { Star } from "lucide-react-native";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";
import { HStack } from "@gluestack-ui/themed";

interface ProductCardProps {
  imagePath: string;
  title: string;
  rating?: number;
  ratingCount?: number;
  price?: string | number;
  discountPrice?: string | number;
}

export function ProductCard({
  imagePath,
  title,
  rating,
  ratingCount,
  price,
  discountPrice,
}: ProductCardProps) {
  const { tokens } = gluestackUIConfig;
  return (
    <VStack flex={1} w={160} bg="$white" rounded="$2xl">
      <Image
        source={imagePath ? { uri: imagePath } : eletronicsImage}
        alt="Eletrônicos"
        w={160}
        h={120}
        style={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
      />

      <VStack flex={1} p={12} justifyContent="space-between">
        <VStack>
          <Text
            fontFamily="$mono"
            fontSize={"$sm"}
            numberOfLines={2}
            color="$textDark800"
          >
            {title}
          </Text>
        </VStack>

        <VStack>
          <HStack alignItems="center" gap={4}>
            <Star size={12} fill={tokens.colors.yellow500} />
            <Text fontFamily="$body" fontSize="$xs" color="$textDark600">
              ({ratingCount})
            </Text>
          </HStack>
          {price ? (
            <>
              <Text fontFamily="$heading" fontSize="$md" color="$teal600">
                R${price}
              </Text>
            </>
          ) : null}
        </VStack>
      </VStack>
    </VStack>
  );
}
