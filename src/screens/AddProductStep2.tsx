import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ScreenHeader } from "@components/ScreenHeader";
import {
  Box,
  HStack,
  Progress,
  ProgressFilledTrack,
} from "@gluestack-ui/themed";
import { VStack, Text, Image } from "@gluestack-ui/themed";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { ImageUp } from "lucide-react-native";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { postItem } from "../api/postItem";
import { postItemImage } from "../api/postImage";

const MAX_IMAGE_SIZE_MB = 5;
const MAX_IMAGES = 3;

export function AddProductStep2() {
  const progressValue = 50;
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const { tokens } = gluestackUIConfig;

  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [step1Data, setStep1Data] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const bytesToMB = (bytes: number) => bytes / 1048576;

  const showToast = (type: "success" | "error", title: string, message: string) => {
    Toast.show({ type, text1: title, text2: message });
  };

  useFocusEffect(
    useCallback(() => {
      const checkData = async () => {
        const data = await AsyncStorage.getItem("productDataStep1");
        if (data) setStep1Data(JSON.parse(data));
      };
      checkData();
    }, [])
  );

  async function handleSelectImage() {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (photoSelected.canceled) return;

      const photoUri = photoSelected.assets[0].uri;

      console.log("Imagem selecionada:", photoSelected);

      const photoInfo = await FileSystem.getInfoAsync(photoUri) as {
        size: number;
        uri: string;
        modificationTime: number;
        exists: boolean;
        isDirectory: boolean;
      };

      const photoSizeMB = bytesToMB(photoInfo.size);
      console.log("Tamanho da imagem:", photoSizeMB);

      if (photoSizeMB > MAX_IMAGE_SIZE_MB) {
        showToast("error", "Imagem muito grande", `A imagem deve ter no máximo ${MAX_IMAGE_SIZE_MB}MB.`);
        return;
      }

      if (selectedImages.length >= MAX_IMAGES) {
        showToast("error", "Limite de imagens", `Você pode adicionar até ${MAX_IMAGES} imagens.`);
        return;
      }

      setSelectedImages([...selectedImages, photoUri]);
      showToast("success", "Imagem adicionada", "A imagem foi adicionada com sucesso.");
    } catch (error) {
      console.error("Erro ao selecionar imagem:", error);
      showToast("error", "Erro", "Não foi possível selecionar a imagem.");
    }
  }

  async function handleCreateProduct() {
    try {
      setLoading(true);

      await postItem({ ...step1Data });

      try {
        await postItemImage({ imagePaths: selectedImages });
      } catch (error) {
        console.error("Erro ao enviar imagens:", error);
        showToast("error", "Erro", "Não foi possível enviar as imagens.");
      }

      await AsyncStorage.removeItem("productDataStep1");
      showToast("success", "Produto criado", "Seu produto foi criado com sucesso!");
      navigation.navigate("dashboard");
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      showToast("error", "Erro", "Não foi possível criar o produto.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Adicionar Produto" backButton />

      <VStack flex={1} px={16} mt={16}>
        <VStack>
          <Progress value={progressValue} size="sm" width="100%">
            <ProgressFilledTrack bg="$teal600" />
          </Progress>

          <HStack>
            <Text fontFamily="$body" fontSize="$sm" mt={8}>
              Etapa 2 de 2: Upload de imagens do produto
            </Text>
            <Text fontFamily="$heading" fontSize="$sm" mt={8} ml="auto">
              {progressValue}%
            </Text>
          </HStack>
        </VStack>

        <VStack mt={16} gap={8}>
          <Text fontFamily="$mono" fontSize="$md" color="$textDark800">
            Imagens do produto
          </Text>
          <Text fontFamily="$body" fontSize="$sm" color="$textDark600">
            Adicione imagens do produto para que os clientes possam visualizar.
          </Text>
          <Box
            gap={8}
            alignItems="center"
            justifyContent="center"
            bg="$white"
            p={16}
            rounded="$md"
            borderWidth={1}
            borderColor="$textDark400"
            borderStyle="$dashed"
          >
            <ImageUp size={64} color={tokens.colors.teal600} />
            <Text
              fontFamily="$body"
              fontSize="$sm"
              color="$textDark600"
              textAlign="center"
            >
              Certifique-se de que as imagens enviadas sejam claras e destaquem
              os principais recursos do seu produto.
            </Text>
            <Button
              title="Adicionar imagem"
              buttonVariant="outline"
              onPress={handleSelectImage}
            />
          </Box>

          <VStack flexWrap="wrap" mt={4} gap={2}>
            <Text fontFamily="$mono" fontSize="$md" color="$textDark800">
              Imagens selecionadas: {selectedImages.length} de {MAX_IMAGES}
            </Text>
            <HStack mt={8} gap={8}>
              {selectedImages.map((image, index) => (
                <Image
                  key={index}
                  source={{ uri: image }}
                  width={64}
                  height={64}
                  rounded="$md"
                  alt=""
                />
              ))}
            </HStack>
          </VStack>
        </VStack>

        <VStack flex={1} />
        <Button
          title={loading ? "Enviando..." : "Confirmar"}
          alignSelf="flex-end"
          mb={16}
          isDisabled={selectedImages.length === 0 || loading}
          onPress={handleCreateProduct}
          isLoading={loading}
        />
      </VStack>
      <Toast />
    </VStack>
  );
}
