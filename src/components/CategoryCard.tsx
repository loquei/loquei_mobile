import { HStack, Pressable, Text } from "@gluestack-ui/themed";
import { MonitorSmartphone, Shirt, Armchair } from "lucide-react-native";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";
import { SearchCategory } from "@screens/SearchCategory";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { useCategoryId } from "@contexts/CategoryIdContext";

interface CategoryCardProps {
  name: string;
  icon: string;
  id: string;
}
export function CategoryCard({ name, icon, id }: CategoryCardProps) {
  const { setCategoryId } = useCategoryId();
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const handleNavigateToListItensCategories = (name: string, id: string) => {
    setCategoryId({ name, id });
    navigation.navigate("searchCategory");
  };

  const { tokens } = gluestackUIConfig;

  return (
    <Pressable
      flex={1}
      px={16}
      py={24}
      bg="$white"
      rounded="$md"
      $active-bg="$secondary100"
      onPress={() => handleNavigateToListItensCategories(name, id)}
    >
      <HStack gap={8}>
        {icon === "Eletrônicos" && (
          <MonitorSmartphone size={24} color={tokens.colors.textDark800} />
        )}
        {icon === "Roupas" && (
          <Shirt size={24} color={tokens.colors.textDark800} />
        )}
        {icon === "Móveis" && (
          <Armchair size={24} color={tokens.colors.textDark800} />
        )}
        <Text fontFamily="$mono" color="$textDark800">
          {name}
        </Text>
      </HStack>
    </Pressable>
  );
}
