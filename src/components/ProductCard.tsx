import { Image, Text, VStack, HStack } from "@gluestack-ui/themed";
import eletronicsImage from "@assets/eletronics.jpg";
import { Star } from "lucide-react-native";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";

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

  const fullStars = Math.floor(rating || 0);
  const halfStar = rating && rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    <VStack flex={1} w={160} bg="$white" rounded="$2xl">
      <Image
        source={imagePath ? { uri: imagePath } : eletronicsImage}
        alt={title}
        w={160}
        h={120}
        style={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
      />

      <VStack flex={1} p={12} justifyContent="space-between">
        {/* Título */}
        <Text
          fontFamily="$mono"
          fontSize={"$sm"}
          numberOfLines={2}
          color="$textDark800"
        >
          {title}
        </Text>

        <VStack mt={8}>
          {rating !== undefined && (
            <HStack alignItems="center" gap={4}>
              <HStack>
                {[...Array(fullStars)].map((_, index) => (
                  <Star key={`full-${index}`} size={12} fill={tokens.colors.yellow500} />
                ))}
                {halfStar > 0 && (
                  <Star key="half" size={12} fill={tokens.colors.yellow500} />
                )}
                {[...Array(emptyStars)].map((_, index) => (
                  <Star
                    key={`empty-${index}`}
                    size={12}
                    fill={tokens.colors.secondary300}
                  />
                ))}
              </HStack>
              {ratingCount !== undefined && (
                <Text fontFamily="$body" fontSize="$xs" color="$textDark600">
                  ({ratingCount})
                </Text>
              )}
            </HStack>
          )}

          {price && (
            <Text fontFamily="$heading" fontSize="$md" color="$teal600">
              R${price}
            </Text>
          )}
        </VStack>
      </VStack>
    </VStack>
  );
}
