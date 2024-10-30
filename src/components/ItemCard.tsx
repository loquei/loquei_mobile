import { HStack, Image, Pressable, Text, VStack } from "@gluestack-ui/themed";
import ItemCardImage from "@assets/eletronics.jpg";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { Trash2, Pencil } from "lucide-react-native";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";
import { DeleteItems } from "../api/deleteItem";

interface ItemCardProps {
  id: string;
  type?: "product" | "order";
  title: string;
  description: string;
  price: string;
  date?: string;
  imagesPaths: string[];
  hasRemoveButton?: boolean;
  hasEditButton?: boolean;
}

export function ItemCard({
  id,
  type,
  title,
  description,
  price,
  date,
  imagesPaths,
  hasRemoveButton,
  hasEditButton,
}: ItemCardProps) {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const { tokens } = gluestackUIConfig;

  const baseURL = "http://192.168.3.2:8080";

  function handleNavigateToProductDetails() {
    type === "product"
      ? navigation.navigate("productDetails", { id })
      : navigation.navigate("orderDetails");
  }

  function handleNavigateToEditProduct() {
    navigation.navigate("editProduct");
  }

  return (
    <TouchableOpacity onPress={handleNavigateToProductDetails}>
      <HStack alignItems="center" bg="$white" p={16} rounded={"$md"}>
        <Image
          source={
            imagesPaths.length > 0
              ? { uri: baseURL + imagesPaths[0] }
              : ItemCardImage
          }
          width={110}
          height={110}
          alt="ItemCardImage"
          rounded={"$md"}
        />

        <VStack flex={1} px={16} py={8} gap={4}>
          <VStack>
            <Text
              fontFamily="$heading"
              fontSize="$md"
              color="$textDark800"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              fontFamily="$body"
              fontSize="$sm"
              color="$textDark600"
              numberOfLines={1}
            >
              {description}
            </Text>
          </VStack>

          {date && (
            <Text fontFamily="$body" fontSize="$sm" color="$textDark600">
              {date}
            </Text>
          )}

          <Text fontFamily="$heading" fontSize="$md" color="$teal600">
            R$ {price}
          </Text>

          <HStack gap={12} alignSelf="flex-end">
            {hasRemoveButton && (
              <TouchableOpacity onPress={() => id && DeleteItems(id)}>
                <Trash2 size={24} color={tokens.colors.red500} />
              </TouchableOpacity>
            )}
            {hasEditButton && (
              <TouchableOpacity onPress={handleNavigateToEditProduct}>
                <Pencil size={24} color={tokens.colors.warning500} />
              </TouchableOpacity>
            )}
          </HStack>
        </VStack>
      </HStack>
    </TouchableOpacity>
  );
}
