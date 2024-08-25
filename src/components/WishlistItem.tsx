import { HStack, Image, Pressable, Text, VStack } from "@gluestack-ui/themed";
import WishlistItemImage from '@assets/eletronics.jpg';
import { TouchableOpacity } from "react-native";

interface WishlistItemProps {
  title: string;
  description: string;
  price: string;
}

export function WishlistItem({ title, description, price }: WishlistItemProps) {
  return (
    <TouchableOpacity>
      <HStack flex={1} alignItems="center" bg="$white" p={16} rounded={"$md"}>
        <Image source={WishlistItemImage} width={110} height={110} alt="WishlistItemImage" rounded={"$md"} />

        <VStack flex={1} px={16} py={8}>
          <VStack>
            <Text fontFamily="$heading" fontSize="$md" color="$textDark800" numberOfLines={1}>
              {title}
            </Text>
            <Text fontFamily="$body" fontSize="$sm" color="$textDark600" numberOfLines={1}>
              {description}
            </Text>
          </VStack>

          <Text fontFamily="$heading" fontSize="$md" color="$teal600" mt={10}>
            {price}
          </Text>

          <TouchableOpacity>
            <Text fontFamily="$body" fontSize="$sm" color="$red500">
              Remover
            </Text>
          </TouchableOpacity>
        </VStack>
      </HStack>
    </TouchableOpacity>
  )
}