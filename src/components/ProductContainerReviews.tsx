import { gluestackUIConfig } from "@gluestack-ui/config";
import { Progress } from "@gluestack-ui/themed";
import { ProgressFilledTrack } from "@gluestack-ui/themed";
import { HStack, Text } from "@gluestack-ui/themed";
import { VStack } from "@gluestack-ui/themed";
import { Star, StarHalf } from "lucide-react-native";
import { Button } from "./Button";
import { FlatList } from "react-native";
import { View } from "@gluestack-ui/themed";
import { Divider } from "@gluestack-ui/themed";

export function ProductReviews() {
  const { tokens } = gluestackUIConfig;

  return (
    <VStack mt={16} px={16}>
      <Text fontFamily="$heading" fontSize={"$lg"} color="$textDark800">
        Avaliações
      </Text>

      <VStack mt={12}>
        <HStack gap={32}>
          <VStack>
            <Text fontFamily="$heading" fontSize={"$3xl"} color="$textDark800">
              4.5
            </Text>

            <VStack>
              <HStack>
                <Star size={20} fill={tokens.colors.yellow500} />
                <Star size={20} fill={tokens.colors.yellow500} />
                <Star size={20} fill={tokens.colors.yellow500} />
                <Star size={20} fill={tokens.colors.yellow500} />
                <StarHalf size={20} fill={tokens.colors.yellow500} />
              </HStack>
              <Text fontFamily="$body" fontSize={"$sm"} color="$textLight600">
                (14 avaliações)
              </Text>
            </VStack>
          </VStack>

          <VStack flex={1}>
            <HStack alignItems="center" gap={8}>
              <Text fontFamily="$body" fontSize={"$lg"} color="$textDark800">
                5
              </Text>
              <Progress value={80} size="sm" flex={1}>
                <ProgressFilledTrack bg="$textDark800" />
              </Progress>
              <Text fontFamily="$body" fontSize={"$lg"} color="$textDark800">
                10
              </Text>
            </HStack>
            <HStack alignItems="center" gap={8}>
              <Text fontFamily="$body" fontSize={"$lg"} color="$textDark800">
                4
              </Text>
              <Progress value={60} size="sm" flex={1}>
                <ProgressFilledTrack bg="$textDark800" />
              </Progress>
              <Text fontFamily="$body" fontSize={"$lg"} color="$textDark800">
                3
              </Text>
            </HStack>
            <HStack alignItems="center" gap={8}>
              <Text fontFamily="$body" fontSize={"$lg"} color="$textDark800">
                3
              </Text>
              <Progress value={40} size="sm" flex={1}>
                <ProgressFilledTrack bg="$textDark800" />
              </Progress>
              <Text fontFamily="$body" fontSize={"$lg"} color="$textDark800">
                1
              </Text>
            </HStack>
            <HStack alignItems="center" gap={8}>
              <Text fontFamily="$body" fontSize={"$lg"} color="$textDark800">
                2
              </Text>
              <Progress value={20} size="sm" flex={1}>
                <ProgressFilledTrack bg="$textDark800" />
              </Progress>
              <Text fontFamily="$body" fontSize={"$lg"} color="$textDark800">
                0
              </Text>
            </HStack>
            <HStack alignItems="center" gap={8}>
              <Text fontFamily="$body" fontSize={"$lg"} color="$textDark800">
                1
              </Text>
              <Progress value={10} size="sm" flex={1}>
                <ProgressFilledTrack bg="$textDark800" />
              </Progress>
              <Text fontFamily="$body" fontSize={"$lg"} color="$textDark800">
                0
              </Text>
            </HStack>
          </VStack>
        </HStack>

        <Button title="Enviar avaliação" mt={16} buttonVariant="secondary" />

        <FlatList
          scrollEnabled={false}
          data={[
            { id: '1', name: 'João Silva', rating: 5, comment: 'Excelente produto, recomendo!', date: '10/08/2024' },
            { id: '2', name: 'Maria Souza', rating: 4, comment: 'Muito bom, atendeu minhas expectativas.', date: '11/08/2024' },
            { id: '3', name: 'José Santos', rating: 3, comment: 'Poderia ser melhor.', date: '12/08/2024' },
          ]}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <VStack mt={16}>
              <HStack gap={8} width={"auto"} alignItems="center">
                <View borderRadius={999} bg="$secondary300" w={45} h={45} />
                <VStack >
                  <Text fontFamily="$mono" fontSize={"$lg"} color="$textDark800">
                    {item.name}
                  </Text>
                  <HStack alignItems="center" gap={10}>
                    <HStack>
                      <Star size={14} fill={tokens.colors.yellow500} />
                      <Star size={14} fill={tokens.colors.yellow500} />
                      <Star size={14} fill={tokens.colors.yellow500} />
                      <Star size={14} fill={tokens.colors.yellow500} />
                      <StarHalf size={14} fill={tokens.colors.yellow500} />
                    </HStack>
                    <Text fontFamily="$body" fontSize={"$sm"} color="$textLight600">
                      {item.date}
                    </Text>
                  </HStack>
                </VStack>
              </HStack>
              <Text fontFamily="$body" fontSize={"$lg"} color="$textDark800" mt={8}>
                {item.comment}
              </Text>
            </VStack>
          )}
          ItemSeparatorComponent={() => <Divider mt={16} />}
        />

        <Button title="Ver todas as avaliações" mt={16} buttonVariant="outline" />
      </VStack>
    </VStack>
  )
}