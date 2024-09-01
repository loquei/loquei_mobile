import { ScreenHeader } from "@components/ScreenHeader";
import { VStack, HStack, Text } from "@gluestack-ui/themed";
import { ListFilter, RotateCw, ArrowDownUp } from 'lucide-react-native';
import { gluestackUIConfig } from "../../config/gluestack-ui.config";
import { FlatList, ScrollView, TouchableOpacity } from "react-native";
import { ItemCard } from "@components/ItemCard";

export function AllOrders() {
  const { tokens } = gluestackUIConfig;

  return (
    <VStack flex={1}>
      <ScreenHeader title="Pedidos" backButton />

      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} nestedScrollEnabled={true} style={{ paddingHorizontal: 16 }}>
        <HStack justifyContent="space-between" alignItems="center" p={16} mt={16} bg="$white" rounded={"$md"}>
          <TouchableOpacity>
            <VStack alignItems="center" gap={4}>
              <ListFilter size={24} color={tokens.colors.textDark800} />
              <Text fontFamily="$body" fontSize="$sm" color="$textDark800">
                Filtrar
              </Text>
            </VStack>
          </TouchableOpacity>

          <TouchableOpacity>
            <VStack alignItems="center" gap={4}>
              <RotateCw size={24} color={tokens.colors.textDark800} />
              <Text fontFamily="$body" fontSize="$sm" color="$textDark800">
                Atualizar
              </Text>
            </VStack>
          </TouchableOpacity>

          <TouchableOpacity>
            <VStack alignItems="center" gap={4}>
              <ArrowDownUp size={24} color={tokens.colors.textDark800} />
              <Text fontFamily="$body" fontSize="$sm" color="$textDark800">
                Ordenar
              </Text>
            </VStack>
          </TouchableOpacity>
        </HStack>

        <VStack p={16} mt={16} bg="$white" rounded={"$md"} alignItems="center">
          <Text fontFamily="$mono" fontSize="$md" color="$textDark800">
            Total de pedidos
          </Text>

          <Text fontFamily="$heading" fontSize="$2xl" color="$textDark800">
            42
          </Text>
        </VStack>

        <FlatList
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          data={[
            { id: '1', title: 'Pedido #12345', description: 'John Doe', date: '12/08/2024', price: 'R$ 3.999,00' },
            { id: '2', title: 'Pedido #12345', description: 'John Doe', date: '13/08/2024', price: 'R$ 3.999,00' },
            { id: '3', title: 'Pedido #12345', description: 'John Doe', date: '11/08/2024', price: 'R$ 3.999,00' },
            { id: '4', title: 'Pedido #12345', description: 'John Doe', date: '10/08/2024', price: 'R$ 3.999,00' },
            { id: '5', title: 'Pedido #12345', description: 'John Doe', date: '09/08/2024', price: 'R$ 3.999,00' },
          ]}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <VStack>
              <ItemCard type="order" title={item.title} description={item.description} date={item.date} price={item.price} />
            </VStack>
          )}
          ItemSeparatorComponent={() => <VStack height={16} />}
          style={{ marginTop: 16, paddingBottom: 32 }}
        />
      </ScrollView>
    </VStack >
  );
}
