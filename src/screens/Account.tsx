import { ScreenHeader } from "@components/ScreenHeader";
import { VStack, Text } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "@components/Button";
import { useModal } from "@contexts/ModalContext";

export function Account() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const { showModal, getActionMessage } = useModal();

  const handleToOnBoarding = () => {
    AsyncStorage.removeItem("AuthToken");
    navigation.navigate("authRoutes");
  };

  const handleDeleteAccount = () => {
    // Ação para deletar a conta do usuário
  };

  const handleOpenModal = (action: "logout" | "deleteAccount") => {
    const actionMessage = getActionMessage(action);
    const onConfirm = action === "logout" ? handleToOnBoarding : handleDeleteAccount;

    showModal({
      ...actionMessage,
      onConfirm,
    });
  };

  return (
    <VStack flex={1}>
      <ScreenHeader title="Conta" backButton />

      <VStack flex={1} p={16} gap={16}>
        <Text fontSize="$lg" fontWeight="bold">
          Gerencie sua conta
        </Text>

        <Text>
          Aqui você pode gerenciar suas informações de conta.
        </Text>

        <VStack space={"4xl"}>
          <VStack gap={8}>
            <Text fontWeight="bold">Sair da conta</Text>
            <Text>Saia da sua conta e volte ao login.</Text>
            <Button
              buttonVariant="danger-outline"
              title="Sair da conta"
              onPress={() => handleOpenModal("logout")}
            />
          </VStack>

          <VStack gap={8}>
            <Text fontWeight="bold">Deletar conta</Text>
            <Text>Uma vez deletada, não há como recuperar sua conta.</Text>
            <Button
              buttonVariant="danger"
              title="Deletar conta"
              onPress={() => handleOpenModal("deleteAccount")}
            />
          </VStack>
        </VStack>
      </VStack>
    </VStack>
  );
}
