import { gluestackUIConfig } from "@gluestack-ui/config";
import { Pressable, Progress } from "@gluestack-ui/themed";
import { ProgressFilledTrack } from "@gluestack-ui/themed";
import { HStack, Text, Spinner } from "@gluestack-ui/themed"; // Adicionando Spinner para o loading
import { VStack } from "@gluestack-ui/themed";
import { Star, StarHalf } from "lucide-react-native";
import { Button } from "./Button";
import { FlatList } from "react-native";
import { View } from "@gluestack-ui/themed";
import { Divider } from "@gluestack-ui/themed";
import { useModal } from "@contexts/ModalContext";
import { useEffect, useState } from "react";
import { listRatings } from "../api/listRatings";
import { Loading } from "./Loading";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { useQuery, useQueryClient } from "@tanstack/react-query";
interface ProductReviewsProps {
  itemId: string;
  raterId: string;
  isItemOwner: boolean;
  isAllRatingsScreen?: boolean;
  perPage?: number;
}

interface Rating {
  id: string;
  rater_id: string;
  userName: string;
  description: string;
  score: number;
  item_id: string;
  updated_at: string;
}

export function ProductContainerReviews({ itemId, raterId, isItemOwner, isAllRatingsScreen, perPage }: ProductReviewsProps) {
  const { tokens } = gluestackUIConfig;
  const { showModal, getActionMessage } = useModal();
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const queryClient = useQueryClient();

  const handleOpenRatingModal = () => {
    handleOpenModal("rating");
  }

  const handleOpenModal = (action: "rating") => {
    const actionMessage = getActionMessage(action);
    const onConfirm = action === "rating" ? handleOpenRatingModal : () => { };

    showModal({
      ...actionMessage,
      itemId: itemId,
      raterId: raterId,
      type: 'rating',
      onConfirm,
      onClose: async () => {
        await queryClient.invalidateQueries('ratings', {
          refetchActive: true,
          refetchInactive: true,
        });
      },
    });
  };

  const { data: ratings = [], isLoading, error } = useQuery({
    queryKey: ['ratings'],
    queryFn: () => listRatings({ perPage, dir: 'desc', sort: 'updatedAt' }),
  });

  if (error) {
    console.error('Erro ao buscar avaliações:', error);
  }

  return (
    <VStack mt={16} px={16}>
      <HStack justifyContent="space-between" alignItems="center">
        <Text fontFamily="$heading" fontSize={"$lg"} color="$textDark800">
          Avaliações
        </Text>
        {!isAllRatingsScreen && (
          <Pressable onPress={() => navigation.navigate("productReviews")}>
            <Text fontFamily="$body" fontSize="$md" color="$teal600">
              Ver todas
            </Text>
          </Pressable>
        )}
      </HStack>

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
            {[
              { leftText: '5', progressValue: 80, rightText: '10' },
              { leftText: '4', progressValue: 60, rightText: '3' },
              { leftText: '3', progressValue: 40, rightText: '1' },
              { leftText: '2', progressValue: 20, rightText: '0' },
              { leftText: '1', progressValue: 10, rightText: '0' },
            ].map(({ leftText, progressValue, rightText }, index) => (
              <HStack alignItems="center" gap={8} key={index}>
                <Text fontFamily="$body" fontSize="$lg" color="$textDark800" width={24} textAlign="center">
                  {leftText}
                </Text>
                <Progress value={progressValue} size="sm" flex={1}>
                  <ProgressFilledTrack bg="$textDark800" />
                </Progress>
                <Text fontFamily="$body" fontSize="$lg" color="$textDark800" width={24} textAlign="center">
                  {rightText}
                </Text>
              </HStack>
            ))}
          </VStack>
        </HStack>

        {!isItemOwner && (
          <Button title="Enviar avaliação" mt={16} buttonVariant="secondary" onPress={handleOpenRatingModal} />
        )}

        {isLoading ? (
          <HStack mt={16} justifyContent="center">
            <Loading />
          </HStack>
        ) : ratings.length > 0 ? (
          <FlatList
            scrollEnabled={false}
            data={ratings}
            keyExtractor={(item: Rating) => item.id}
            renderItem={({ item }) => (
              <VStack mt={16}>
                <HStack gap={8} width="100%" alignItems="center">
                  <View borderRadius={999} bg="$secondary300" w={45} h={45} />
                  <VStack flex={1}>
                    <Text fontFamily="$mono" fontSize="$lg" color="$textDark800" numberOfLines={1} ellipsizeMode="tail">
                      {item.userName}
                    </Text>
                    <HStack justifyContent="space-between" alignItems="center" gap={10}>
                      <HStack>
                        {[...Array(Math.floor(item.score))].map((_, index) => (
                          <Star key={index} size={14} fill={tokens.colors.yellow500} />
                        ))}
                        {item.score % 1 !== 0 && <StarHalf size={14} fill={tokens.colors.yellow500} />}
                      </HStack>
                      <Text fontFamily="$body" fontSize="$sm" color="$textLight600">
                        {new Date(item.updated_at).toLocaleDateString('pt-BR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </Text>
                    </HStack>
                  </VStack>
                </HStack>
                <Text fontFamily="$body" fontSize="$lg" color="$textDark800" mt={8}>
                  {item.description}
                </Text>
              </VStack>
            )}
            ItemSeparatorComponent={() => <Divider mt={16} />}
          />
        ) : (
          <Text fontFamily="$body" fontSize="$lg" color="$textLight600" mt={16} textAlign="center">
            Nenhuma avaliação disponível
          </Text>
        )}
      </VStack>
    </VStack>
  );
}