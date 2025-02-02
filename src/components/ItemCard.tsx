import { HStack, Image, Pressable, Text, VStack } from "@gluestack-ui/themed";
import ItemCardImage from "@assets/eletronics.jpg";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { Pencil, Trash, Trash2 } from "lucide-react-native";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";
import { baseURL } from "../constants/authentications";

interface ItemCardProps {
  id: string;
  type?: "wishlistItem" | "product" | "order";
  title: string;
  description: string;
  price: string;
  date?: string;
  imagesPaths: string[] | string;
  perDayString?: boolean;
  hasRemoveButton?: boolean;
  hasEditButton?: boolean;
  onRemove?: () => void;
}

export function ItemCard({
  id,
  type,
  title,
  description,
  price,
  date,
  imagesPaths,
  perDayString,
  hasRemoveButton,
  hasEditButton,
  onRemove,
}: ItemCardProps) {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const { tokens } = gluestackUIConfig;

  function handleNavigateToProductDetails() {
    console.log("Redirecting to product details", id);
    type === "product" || type === "wishlistItem"
      ? navigation.navigate("productDetails", { id })
      : navigation.navigate("orderDetails", { id });
  }

  function handleNavigateToEditProduct() {
    navigation.navigate("editProduct", { id });
  }

  return (
    <TouchableOpacity
      onPress={handleNavigateToProductDetails}
      style={{
        borderColor: tokens.colors.secondary100,
        borderWidth: 1,
        borderRadius: tokens.radii.md,
      }}
    >
      <HStack alignItems="center" bg="$white" p={16} rounded={"$md"}>
        <Image
          source={
            typeof imagesPaths === "string"
              ? { uri: imagesPaths }
              : imagesPaths.length > 0
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

            {perDayString && (
              <Text fontFamily="$body" fontSize="$sm" color="$textLight600">
                {" "}
                / dia
              </Text>
            )}
          </Text>

          <HStack gap={12} alignSelf="flex-end">
            {hasEditButton && (
              <TouchableOpacity onPress={handleNavigateToEditProduct}>
                <HStack
                  gap={4}
                  alignItems="center"
                  justifyContent="center"
                  rounded="$md"
                >
                  <Text fontFamily="$mono" fontSize="$md" color="$warning500">
                    Editar
                  </Text>

                  <Pencil size={24} color={tokens.colors.warning500} />
                </HStack>
              </TouchableOpacity>
            )}

            {hasRemoveButton && (
              <TouchableOpacity onPress={onRemove}>
                <HStack
                  gap={4}
                  alignItems="center"
                  justifyContent="center"
                  rounded="$md"
                >
                  <Trash2 size={24} color={tokens.colors.error500} />
                </HStack>
              </TouchableOpacity>
            )}
          </HStack>
        </VStack>
      </HStack>
    </TouchableOpacity>
  );
}
