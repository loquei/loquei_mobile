import { IPostRating } from "../@types/TRating";
import { api } from "./axios/axiosConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUser, getUserById } from "./getUser";

interface ListRatingProps {
  perPage?: number | null;
  dir?: "asc" | "desc";
  sort?: "score" | "updatedAt";
}

export const listRatings = async (
  { perPage = null, dir = "desc", sort = "updatedAt" }: ListRatingProps
) => {
  const token = await AsyncStorage.getItem("AuthToken");

  if (!token) {
    console.error("Token de autenticação não encontrado.");
    return [];
  }

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };

  try {
    const params = {
      perPage,
      dir,
      sort,
    }

    const response = await api.get('/ratings', { headers, params });

    const ratings = response.data.items;

    const ratingsWithUserNames = await Promise.all(
      ratings.map(async (rating: IPostRating) => {
        const user = await getUserById(rating.rater_id);
        return {
          ...rating,
          user
        };
      })
    );

    return ratingsWithUserNames;
  } catch (error) {
    console.error('Erro ao buscar avaliações:', error);
    throw error;
  }
};
