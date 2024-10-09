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
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { ImageUp } from "lucide-react-native";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { postItem } from "../api/postItem";

export function AddProductStep2() {
  const progressValue = 50;

  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const { tokens } = gluestackUIConfig;

  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const getProductStep1Data = async () => {
    const step1Data = await AsyncStorage.getItem("Step1CreateProduct");
    return step1Data;
  };
  const productStep1Data = getProductStep1Data();
  const isDisable = !productStep1Data;

  async function handleUserPhotoSelect() {
    if (isDisable) {
      try {
        const photoSelected = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 1,
          aspect: [4, 4],
          allowsEditing: true,
        });

        if (photoSelected.canceled) {
          return;
        }

        const photoUri = photoSelected.assets[0].uri;

        if (photoUri) {
          const photoInfo = (await FileSystem.getInfoAsync(photoUri)) as {
            size: number;
          };

          if (photoInfo.size && photoInfo.size / 1024 / 1024 > 5) {
            alert(
              "A imagem selecionada é muito grande, selecione uma imagem de até 5MB"
            );
            return;
          }

          setSelectedImages((prev) => [...prev, photoUri]);
          if (selectedImages.length === 1) {
            await postItem(JSON.parse(productStep1Data));
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    console.log("Os dados estão em falta.");
  }

  function handleNavigateToAddProductStep2() {
    navigation.navigate("addProductStep2");
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
              onPress={handleUserPhotoSelect} // Chama a função para selecionar fotos
            />
          </Box>

          <VStack flexWrap="wrap" mt={4} gap={2}>
            <Text fontFamily="$mono" fontSize="$md" color="$textDark800">
              Imagens selecionadas: {selectedImages.length} de 3
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
          title="Confirmar"
          onPress={handleNavigateToAddProductStep2}
          alignSelf="flex-end"
          mb={16}
          isDisabled={isDisable}
        />
      </VStack>
    </VStack>
  );
}
