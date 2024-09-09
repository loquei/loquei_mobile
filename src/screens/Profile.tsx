import { ScreenHeader } from "@components/ScreenHeader";
import { gluestackUIConfig } from "@gluestack-ui/config";
import {
  Box,
  Divider,
  HStack,
  Heading,
  Image,
  Pressable,
  Text,
  VStack,
  View,
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import {
  Bell,
  ChevronRight,
  User,
  MapPin,
  LockKeyhole,
  CircleDollarSign,
  CircleHelp,
  Info,
} from "lucide-react-native";
import { TouchableOpacity } from "react-native";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useState } from "react";

export function Profile() {
  const [userPhoto, setUserPhoto] = useState(
    "https://img.freepik.com/free-photo/how-may-i-help-you-smiling-young-modern-guy-with-beard-waiting-looking-hopeful-assisting-standing-white-background_176420-49644.jpg?t=st=1724706288~exp=1724709888~hmac=87b19bdaedc452696bd6888e87642e5ebc9ec98d2d982f5ec3f25b98bd819ebb&w=1380"
  );

  const { tokens } = gluestackUIConfig;
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleToLeasing() {
    navigation.navigate("leasing");
  }
  function handleToAccount() {
    navigation.navigate("account");
  }

  async function handleUserPhotoSelect() {
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

        setUserPhoto(photoSelected.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <VStack>
      <ScreenHeader title="Perfil" backButton />

      <VStack justifyContent="center" alignItems="center" px={16} mt={16}>
        <Image
          source={{ uri: userPhoto }}
          width={96}
          height={96}
          rounded={"$full"}
          borderWidth={1}
          borderColor="$secondary200"
          alt=""
        />
        <Heading
          color="$textDark800"
          fontSize="$xl"
          fontFamily="$heading"
          textAlign="center"
        >
          John Doe
        </Heading>
        <TouchableOpacity onPress={handleUserPhotoSelect}>
          <Text color="$teal600" fontSize="$sm" fontFamily="$heading">
            Trocar foto
          </Text>
        </TouchableOpacity>
      </VStack>

      <VStack mt={16} px={16}>
        <Box mt={16} bg="$white" width="$full" rounded={"$md"}>
          <Pressable
            $active-backgroundColor="$backgroundLight100"
            onPress={handleToAccount}
          >
            <HStack justifyContent="space-between" p={16} alignItems="center">
              <HStack alignItems="center" gap={16}>
                <User size={24} color={tokens.colors.textDark800} />
                <Text color="$textDark800" fontSize="$md" fontFamily="$body">
                  Conta
                </Text>
              </HStack>
              <ChevronRight size={24} color={tokens.colors.textDark800} />
            </HStack>
          </Pressable>
          <Divider />

          <Pressable $active-backgroundColor="$backgroundLight100">
            <HStack justifyContent="space-between" p={16} alignItems="center">
              <HStack alignItems="center" gap={16}>
                <MapPin size={24} color={tokens.colors.textDark800} />
                <Text color="$textDark800" fontSize="$md" fontFamily="$body">
                  Endereços
                </Text>
              </HStack>
              <ChevronRight size={24} color={tokens.colors.textDark800} />
            </HStack>
          </Pressable>
          <Divider />

          <Pressable $active-backgroundColor="$backgroundLight100">
            <HStack justifyContent="space-between" p={16} alignItems="center">
              <HStack alignItems="center" gap={16}>
                <Bell size={24} color={tokens.colors.textDark800} />
                <Text color="$textDark800" fontSize="$md" fontFamily="$body">
                  Notificações
                </Text>
              </HStack>
              <ChevronRight size={24} color={tokens.colors.textDark800} />
            </HStack>
          </Pressable>
          <Divider />

          <Pressable $active-backgroundColor="$backgroundLight100">
            <HStack justifyContent="space-between" p={16} alignItems="center">
              <HStack alignItems="center" gap={16}>
                <LockKeyhole size={24} color={tokens.colors.textDark800} />
                <Text color="$textDark800" fontSize="$md" fontFamily="$body">
                  Privacidade
                </Text>
              </HStack>
              <ChevronRight size={24} color={tokens.colors.textDark800} />
            </HStack>
          </Pressable>
          <Divider />

          <Pressable
            $active-backgroundColor="$backgroundLight100"
            onPress={handleToLeasing}
          >
            <HStack justifyContent="space-between" p={16} alignItems="center">
              <HStack alignItems="center" gap={16}>
                <CircleDollarSign size={24} color={tokens.colors.textDark800} />
                <Text color="$textDark800" fontSize="$md" fontFamily="$body">
                  Locar produtos
                </Text>
              </HStack>
              <ChevronRight size={24} color={tokens.colors.textDark800} />
            </HStack>
          </Pressable>
          <Divider />

          <Pressable $active-backgroundColor="$backgroundLight100">
            <HStack justifyContent="space-between" p={16} alignItems="center">
              <HStack alignItems="center" gap={16}>
                <CircleHelp size={24} color={tokens.colors.textDark800} />
                <Text color="$textDark800" fontSize="$md" fontFamily="$body">
                  Ajuda
                </Text>
              </HStack>
              <ChevronRight size={24} color={tokens.colors.textDark800} />
            </HStack>
          </Pressable>
          <Divider />

          <Pressable $active-backgroundColor="$backgroundLight100">
            <HStack justifyContent="space-between" p={16} alignItems="center">
              <HStack alignItems="center" gap={16}>
                <Info size={24} color={tokens.colors.textDark800} />
                <Text color="$textDark800" fontSize="$md" fontFamily="$body">
                  Sobre
                </Text>
              </HStack>
              <ChevronRight size={24} color={tokens.colors.textDark800} />
            </HStack>
          </Pressable>
        </Box>
      </VStack>
    </VStack>
  );
}
