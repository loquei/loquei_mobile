import { TouchableOpacity } from "react-native";
import { format } from "date-fns";
import { getStatusDescription } from "@utils/getStatusDescription";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { HStack, Text, VStack, View } from "@gluestack-ui/themed";

interface RentalItemCardProps {
  id: string;
  title?: string;
  status: string;
  startDate: string;
  endDate: string;
  totalValue: number;
}

export function RentalItemCard({ id, title, status, startDate, endDate, totalValue }: RentalItemCardProps) {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleNavigateToProductDetails() {
    navigation.navigate("productDetails", { id });
  }

  return (
    <View px={16} mt={16}>
      <TouchableOpacity onPress={handleNavigateToProductDetails}>
        <HStack alignItems="center" bg="$white" p={16} rounded={"$md"} mb={4}>
          <VStack flex={1} px={16}>
            <Text fontFamily="$heading" fontSize="$md" color="$textDark800" numberOfLines={1}>
              {title}
            </Text>
            <Text fontFamily="$body" fontSize="$sm" color="$textDark600" numberOfLines={1}>
              Status: {getStatusDescription(status)}
            </Text>
            <Text fontFamily="$body" fontSize="$sm" color="$textDark600">
              de {format(new Date(startDate), 'dd/MM/yyyy')} até {format(new Date(endDate), 'dd/MM/yyyy')}
            </Text>
            <Text fontFamily="$heading" fontSize="$md" color="$teal600">
              R$ {totalValue}
            </Text>
          </VStack>
        </HStack>
      </TouchableOpacity>
    </View>
  );
}