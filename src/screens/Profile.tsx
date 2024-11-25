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
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import {
  Bell,
  ChevronRight,
  User,
  MapPin,
  Handshake,
  LockKeyhole,
  CircleDollarSign,
  CircleHelp,
  Info,
} from "lucide-react-native";
import { ScrollView, TouchableOpacity } from "react-native";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useCallback, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { postUserImage } from "../api/postImage";
import { getUserPhoto } from "../api/getUserPhoto";
import { deleteUserPhoto } from "../api/deleteUserPhoto";
import Toast from 'react-native-toast-message';

export function Profile() {
  const [userPhoto, setUserPhoto] = useState("");
  const [user, setUser] = useState<any>({});

  const { tokens } = gluestackUIConfig;
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleUserRedirect(url: string) {
    switch (url) {
      case "account":
        return navigation.navigate("account");
      case "addAddress":
        return navigation.navigate("addAddress");
      case "notifications":
        return navigation.navigate("notifications");
      case "privacy":
        return navigation.navigate("privacy");
      case "rentalHistory":
        return navigation.navigate("rentalHistory", { id: user?.items?.[0]?.id });
      case "leasing":
        return navigation.navigate("leasing");
      case "help":
        return navigation.navigate("help");
      case "about":
        return navigation.navigate("about");

      default:
    }
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

      if (photoUri === user?.items?.[0]?.profileImage) {
        Toast.show({
          type: 'error',
          text1: 'Erro!',
          text2: 'A nova foto precisa ser diferente da atual.',
        });
        return;
      }

      await postUserImage(user?.items?.[0]?.id, { imagePaths: [photoUri] });

      setUserPhoto(photoUri);
      Toast.show({
        type: 'success',
        text1: 'Sucesso!',
        text2: 'Sua foto de perfil foi atualizada.',
      });
    } catch (error: any) {
      if (error.message === "A nova foto precisa ser diferente da atual.") {
        Toast.show({
          type: 'error',
          text1: 'Erro!',
          text2: 'A nova foto precisa ser diferente da atual.',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Erro inesperado',
          text2: 'Não foi possível atualizar a foto. Tente novamente mais tarde.',
        });
      }
    }
  }

  async function handleUserPhotoRemove() {
    await deleteUserPhoto(user?.items?.[0]?.id);
    setUserPhoto("");
  }

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const currentUser = await AsyncStorage.getItem("currentUser");
          if (currentUser) {
            const parsedUser = JSON.parse(currentUser);
            if (parsedUser?.items?.[0]?.id) {
              setUser(parsedUser);

              const userPhoto = await getUserPhoto(parsedUser.items[0].id);
              if (userPhoto) {
                console.log("ID DO USUARIO QUE TEM FOTO:", parsedUser.items[0].id);
                setUserPhoto(
                  `https://loquei-balerion-project-778be9e88a13.herokuapp.com/api/users/images/view/${parsedUser.items[0].id}`
                );
              } else {
                setUserPhoto("");
              }
            }
          } else {
            console.warn("Nenhum usuário atual encontrado no AsyncStorage.");
          }
        } catch (error) {
          console.error("Erro ao buscar dados do usuário:", error);
        }
      };

      fetchData();
    }, [])
  );

  const userInitials = user?.items?.[0]?.personal_name
    ? `${user.items[0].personal_name.split(" ")[0][0]}${user.items[0].personal_name.split(" ").length > 1
      ? user.items[0].personal_name.split(" ").slice(-1)[0][0]
      : ""
    }`
    : "";

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}
    >
      <ScreenHeader title="Perfil" backButton />

      <VStack justifyContent="center" alignItems="center" px={16} mt={16}>
        {
          userPhoto ? (
            <Image
              source={
                userPhoto
                  ? { uri: userPhoto }
                  : ""
              }
              width={96}
              height={96}
              rounded={"$full"}
              borderWidth={1}
              borderColor="$secondary200"
              alt=""
            />
          ) : (
            <View
              width={96}
              height={96}
              rounded={"$full"}
              borderWidth={1}
              borderColor="$secondary200"
              justifyContent="center"
              alignItems="center"
              bg="$secondary100"
            >
              <Text color="$textDark800" fontSize="$xl" fontFamily="$heading">
                {userInitials}
              </Text>

            </View>
          )
        }
        <Heading
          color="$textDark800"
          fontSize="$xl"
          fontFamily="$heading"
          textAlign="center"
        >
          {user?.items?.[0]?.personal_name}
        </Heading>
        {
          userPhoto ? (
            <TouchableOpacity onPress={handleUserPhotoRemove}>
              <Text color="$red600" fontSize="$sm" fontFamily="$heading">
                Remover foto
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleUserPhotoSelect}>
              <Text color="$teal600" fontSize="$sm" fontFamily="$heading">
                Adicionar foto
              </Text>
            </TouchableOpacity>
          )
        }
      </VStack>

      <VStack mt={16} mb={16} px={16}>
        <Box mt={16} bg="$white" width="$full" rounded={"$md"}>
          <Pressable
            $active-backgroundColor="$backgroundLight100"
            onPress={() => handleUserRedirect("account")}
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

          <Pressable
            $active-backgroundColor="$backgroundLight100"
            onPress={() => handleUserRedirect("privacy")}
          >
            <HStack justifyContent="space-between" p={16} alignItems="center">
              <HStack alignItems="center" gap={16}>
                <LockKeyhole size={24} color={tokens.colors.textDark800} />
                <Text color="$textDark800" fontSize="$md" fontFamily="$body">
                  Política de privacidade
                </Text>
              </HStack>
              <ChevronRight size={24} color={tokens.colors.textDark800} />
            </HStack>
          </Pressable>
          <Divider />

          <Pressable
            $active-backgroundColor="$backgroundLight100"
            onPress={() => handleUserRedirect("rentalHistory")}
          >
            <HStack justifyContent="space-between" p={16} alignItems="center">
              <HStack alignItems="center" gap={16}>
                <Handshake size={24} color={tokens.colors.textDark800} />
                <Text color="$textDark800" fontSize="$md" fontFamily="$body">
                  Meus aluguéis
                </Text>
              </HStack>
              <ChevronRight size={24} color={tokens.colors.textDark800} />
            </HStack>
          </Pressable>
          <Divider />

          <Pressable
            $active-backgroundColor="$backgroundLight100"
            onPress={() => handleUserRedirect("leasing")}
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

          <Pressable
            $active-backgroundColor="$backgroundLight100"
            onPress={() => handleUserRedirect("help")}
          >
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

          <Pressable
            $active-backgroundColor="$backgroundLight100"
            onPress={() => handleUserRedirect("about")}
          >
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
      <Toast />
    </ScrollView>
  );
}