import { GetItemImages } from "./getItemImages";

export const GetItemFirstImage = async (itemId: string) => {
  console.log(`Iniciando busca de imagens para o item ${itemId}...`);
  const itemImages = await GetItemImages(itemId);
  console.log(`VINDO DO FIRST IMAGE Imagens  do item ${itemId} encontradas:`, itemImages.links[0]);

  const regex = /view\/([a-z0-9]+)$/;
  const formatedFirstImageId = itemImages.links[0].match(regex)[1];
  console.log(`ID da primeira imagem do item ${itemId} formatado:`, formatedFirstImageId);

  const baseURL = process.env.EXPO_BASE_URL;

  try {
    console.log(`Iniciando busca de primeira imagem para o item ${itemId}...`);

    console.log(`Primeira imagem do item ${itemId} encontrada:`, formatedFirstImageId);


    if (itemId) {
      const response = `${baseURL}/items/images/view/${formatedFirstImageId}`;
      console.log(`Primeira imagem do item ${itemId} recebida:`, response);
      return response;
    } else {
      console.log(`Nenhuma imagem encontrada para o item ${itemId}`);
      return [];
    }

  } catch (error) {
    console.error(`Erro ao buscar imagem do item ${itemId}:`, error);
    throw error;
  }
};