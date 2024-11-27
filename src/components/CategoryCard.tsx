import { HStack, Pressable, Text, VStack } from "@gluestack-ui/themed";
import {
  MonitorSmartphone,
  Baby,
  PartyPopper,
  Hammer,
  Medal,
  Guitar,
  Shirt,
  Armchair,
} from "lucide-react-native";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";
import { SearchCategory } from "@screens/SearchCategory";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { useCategoryId } from "@contexts/CategoryIdContext";

interface CategoryCardProps {
  name: string;
  icon: string;
  id: string;
  height?: number;
  orientation?: "horizontal" | "vertical";
}

export function CategoryCard({
  name,
  icon,
  id,
  height,
  orientation = "vertical", // Default orientation is vertical
}: CategoryCardProps) {
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
      borderWidth={1}
      borderColor="$secondary100"
      height={height}
      alignContent="center"
      justifyContent="center"
      bg="$white"
      rounded="$md"
      $active-bg="$secondary100"
      onPress={() => handleNavigateToListItensCategories(name, id)}
    >

      {orientation === "vertical" ? (
        <VStack gap={8} alignItems="center" justifyContent="center">
          {icon === "Eletrônicos e Tecnologia" && (
            <MonitorSmartphone size={32} color={tokens.colors.textDark800} />
          )}
          {icon === "Ferramentas e Equipamentos" && (
            <Hammer size={32} color={tokens.colors.textDark800} />
          )}
          {icon === "Produtos Infantis" && (
            <Baby size={32} color={tokens.colors.textDark800} />
          )}
          {icon === "Eventos e festa" && (
            <PartyPopper size={32} color={tokens.colors.textDark800} />
          )}
          {icon === "Esportes" && (
            <Medal size={32} color={tokens.colors.textDark800} />
          )}
          {icon === "Instrumentos Musicais" && (
            <Guitar size={32} color={tokens.colors.textDark800} />
          )}
          {icon === "Moda" && (
            <Shirt size={32} color={tokens.colors.textDark800} />
          )}
          {icon === "Móveis" && (
            <Armchair size={32} color={tokens.colors.textDark800} />
          )}
          <Text fontFamily="$mono" color="$textDark800" textAlign="center">
            {name}
          </Text>
        </VStack>
      ) : (
        <HStack gap={8} alignItems="center" justifyContent="center">
          {icon === "Eletrônicos e Tecnologia" && (
            <MonitorSmartphone size={32} color={tokens.colors.textDark800} />
          )}
          {icon === "Ferramentas e Equipamentos" && (
            <Hammer size={32} color={tokens.colors.textDark800} />
          )}
          {icon === "Produtos Infantis" && (
            <Baby size={32} color={tokens.colors.textDark800} />
          )}
          {icon === "Eventos e festa" && (
            <PartyPopper size={32} color={tokens.colors.textDark800} />
          )}
          {icon === "Esportes" && (
            <Medal size={32} color={tokens.colors.textDark800} />
          )}
          {icon === "Instrumentos Musicais" && (
            <Guitar size={32} color={tokens.colors.textDark800} />
          )}
          {icon === "Moda" && (
            <Shirt size={32} color={tokens.colors.textDark800} />
          )}
          {icon === "Móveis" && (
            <Armchair size={32} color={tokens.colors.textDark800} />
          )}
          <Text fontFamily="$mono" color="$textDark800" textAlign="center">
            {name}
          </Text>
        </HStack>
      )}
    </Pressable>
  );
}
