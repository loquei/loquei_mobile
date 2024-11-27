import { gluestackUIConfig } from "@gluestack-ui/config";
import { Pressable, Progress } from "@gluestack-ui/themed";
import { ProgressFilledTrack } from "@gluestack-ui/themed";
import { HStack, Text } from "@gluestack-ui/themed";
import { VStack } from "@gluestack-ui/themed";
import { Star, StarHalf } from "lucide-react-native";
import { Button } from "./Button";
import { FlatList, Image } from "react-native";
import { View } from "@gluestack-ui/themed";
import { Divider } from "@gluestack-ui/themed";
import { useModal } from "@contexts/ModalContext";
import { listRatings } from "../api/listRatings";
import { Loading } from "./Loading";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { getUserPhoto } from "../api/getUserPhoto";

interface ProductReviewsProps {
  itemId: string;
  raterId: string;
  isItemOwner: boolean;
  isAllRatingsScreen?: boolean;
  hasSomeRentalTerminated?: boolean;
  perPage?: number;
}

interface Rating {
  id: string;
  rater_id: string;
  user: {
    id: string;
    user_name: string;
    personal_name: string;
    email: string;
    phone: string;
    document: string;
    birth: string;
    created_at: string;
    updated_at: string;
  };
  description: string;
  score: number;
  item_id: string;
  updated_at: string;
}

export function ProductContainerReviews({ itemId, raterId, isItemOwner, isAllRatingsScreen, hasSomeRentalTerminated, perPage }: ProductReviewsProps) {
  const { tokens } = gluestackUIConfig;
  const { showModal, getActionMessage } = useModal();
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const queryClient = useQueryClient();
  const [userPhotos, setUserPhotos] = useState<{ [key: string]: string }>({});

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
        await queryClient.invalidateQueries({ queryKey: ['ratings'] });
      },
    });
  };

  const { data: ratings = [], isLoading, error } = useQuery({
    queryKey: ['ratings'],
    queryFn: () => listRatings({ perPage, dir: 'desc', sort: 'updatedAt' }),
  });

  const fetchUserPhotos = useCallback(async () => {
    const photos: { [key: string]: string } = {};
    for (const rating of ratings) {
      const userPhoto = await getUserPhoto(rating.user.id);
      if (userPhoto) {
        photos[rating.user.id] = `https://loquei-balerion-project-778be9e88a13.herokuapp.com/api/users/images/view/${rating.user.id}`;
      }
    }
    setUserPhotos(photos);
  }, [ratings]); // A função será recriada sempre que ratings mudar

  useEffect(() => {
    // Chama o fetchUserPhotos quando ratings mudar, mas apenas uma vez
    if (ratings.length > 0) {
      fetchUserPhotos();
    }
  }, [ratings, fetchUserPhotos]); // Dependência de fetchUserPhotos

  if (error) {
    console.error('Erro ao buscar avaliações:', error);
  }

  const filteredRatings = ratings.filter((rating: Rating) => rating.item_id === itemId);

  const averageScore = filteredRatings.length
    ? parseFloat((filteredRatings.reduce((sum, rating) => sum + rating.score, 0) / filteredRatings.length).toFixed(1))
    : 0;

  const totalRatings = filteredRatings.length;

  const fullStars = Math.floor(averageScore);
  const halfStar = averageScore % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  const getRatingCount = (score: number) => {
    return filteredRatings.filter((rating) => Math.floor(rating.score) === score).length;
  };

  console.log('filteredRatings', filteredRatings);

  const userInitials = filteredRatings[0]?.user?.personal_name
    ? `${filteredRatings[0].user.personal_name.trim().split(" ")[0][0]}${filteredRatings[0].user.personal_name.trim().split(" ").length > 1
      ? filteredRatings[0].user.personal_name.trim().split(" ").slice(-1)[0][0]
      : ""
    }`
    : "";

  return (
    <VStack mt={16} px={16}>
      <HStack justifyContent="space-between" alignItems="center">
        <Text fontFamily="$heading" fontSize={"$lg"} color="$textDark800">
          Avaliações
        </Text>
        {!isAllRatingsScreen && (
          <Pressable onPress={() => navigation.navigate("productReviews", { itemId, raterId, isItemOwner })}>
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
              {averageScore}
            </Text>
            <VStack>
              <HStack>
                {[...Array(fullStars)].map((_, index) => (
                  <Star key={`full-${index}`} size={20} fill={tokens.colors.yellow500} />
                ))}
                {halfStar > 0 && <StarHalf size={20} fill={tokens.colors.yellow500} />}
                {[...Array(emptyStars)].map((_, index) => (
                  <Star key={`empty-${index}`} size={20} fill={tokens.colors.secondary100} />
                ))}
              </HStack>
              <Text fontFamily="$body" fontSize={"$sm"} color="$textLight600">
                ({totalRatings} avaliações)
              </Text>
            </VStack>
          </VStack>

          <VStack flex={1}>
            {[5, 4, 3, 2, 1].map((score) => (
              <HStack alignItems="center" gap={8} key={score}>
                <Text fontFamily="$body" fontSize="$lg" color="$textDark800" width={24} textAlign="center">
                  {score}
                </Text>
                <Progress value={(getRatingCount(score) / totalRatings) * 100} size="sm" flex={1}>
                  <ProgressFilledTrack bg="$textDark800" />
                </Progress>
              </HStack>
            ))}
          </VStack>
        </HStack>

        {!isItemOwner && hasSomeRentalTerminated &&
          // verifica se os status dos pedidos tem algum TERMINATED e se o usuário logado é o dono do item
          // se for, exibe o botão de avaliação

          (
            <Button title="Enviar avaliação" mt={16} buttonVariant="secondary" onPress={handleOpenRatingModal} />
          )}

        {isLoading ? (
          <HStack mt={16} justifyContent="center">
            <Loading />
          </HStack>
        ) : filteredRatings.length > 0 ? (
          <FlatList
            scrollEnabled={false}
            data={filteredRatings}
            keyExtractor={(item: Rating) => item.id}
            renderItem={({ item }) => (
              <VStack mt={16}>
                <HStack gap={8} width="100%" alignItems="center">
                  <View borderRadius={999} bg="$secondary200" w={45} h={45} justifyContent="center" alignContent="center">
                    {userPhotos[item.user.id] ? (
                      <Image
                        source={{ uri: userPhotos[item.user.id] }}
                        width={45}
                        height={45}
                        borderRadius={999}
                        alt=""
                      />
                    ) : (
                      <Text fontFamily="$heading" fontSize="$sm" color="$textDark800" textAlign="center" lineHeight={45}>
                        {userInitials}
                      </Text>
                    )}
                  </View>
                  <VStack flex={1}>
                    <Text fontFamily="$mono" fontSize="$lg" color="$textDark800" numberOfLines={1} ellipsizeMode="tail">
                      {item.user.personal_name}
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
          <Text fontFamily="$body" fontSize="$md" color="$textLight600" mt={16} textAlign="center">
            Este produto ainda não possui avaliações.
          </Text>
        )}
      </VStack>
    </VStack>
  );
}