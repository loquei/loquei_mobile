import { ScreenHeader } from "@components/ScreenHeader";
import { gluestackUIConfig } from "@gluestack-ui/config";
import {
  VStack,
  Text,
  Box,
  Pressable,
  HStack,
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialogHeader,
  Heading,
  AlertDialogFooter,
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { Flag, Trash2 } from "lucide-react-native";
import { deleteUser } from "../api/deleteUser";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Account() {
  const [showModal, setShowModal] = useState(false);
  const { tokens } = gluestackUIConfig;
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const handleToOnBoarding = () => {
    AsyncStorage.removeItem("AuthToken");
    navigation.navigate("onBoarding");
  };

  const handleOpenModal = () => {
    setShowModal(!showModal);
  };

  const handleSignOutAccount = async () => {
    // await deleteUser();
    handleToOnBoarding();
  };

  return (
    <VStack>
      <ScreenHeader title="Conta" backButton />
      <Box mt={16} bg="$white" width="$full" rounded={"$md"}>
        <Pressable
          $active-backgroundColor="$backgroundLight100"
          onPress={handleOpenModal}
        >
          <HStack justifyContent="space-between" p={16} alignItems="center">
            <HStack alignItems="center" gap={16}>
              <Trash2 size={24} color={tokens.colors.red400} />
              <Text color="$red500" fontSize="$md" fontFamily="$body">
                Sair da conta
              </Text>
            </HStack>
          </HStack>
        </Pressable>
      </Box>
      <AlertDialog isOpen={showModal} onClose={handleOpenModal}>
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Heading fontSize="$lg" fontFamily="$body" size="md">
              Você deseja sair da sua conta?
            </Heading>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text fontFamily="$body" fontSize="$md">
              Você tem certeza que deseja sair da sua conta?
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter display="flex" justifyContent="space-around">
            <Pressable onPress={handleOpenModal}>
              <Text>Cancelar</Text>
            </Pressable>
            <Pressable onPress={handleSignOutAccount} w="$24">
              <Text
                bgColor="$red500"
                color="$white"
                p="$1"
                borderRadius="$md"
                textAlign="center"
              >
                Sair
              </Text>
            </Pressable>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </VStack>
  );
}
