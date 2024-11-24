import { Center, HStack, VStack, Image, Text } from "@gluestack-ui/themed";
import onBoardingImage from '@assets/loqueiHeroImage.png';
import { Button } from "@components/Button";

import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from "@routes/app.routes";

export function Leasing() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleNavigateToDashboard() {
    navigation.navigate('dashboard');
  }

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <VStack flex={1} px={16} py={40}>
      <Center flex={1}>
        <Image source={onBoardingImage} alt="Onboarding" width={300} height={300} />

        <Text fontSize="$2xl" fontFamily="$heading" color="$textDark800" mt={24} width={310} textAlign="center">Comece a locar na plataforma</Text>
        <Text fontFamily="$body" fontSize="$md" color="$textDark800" mt={12} textAlign="center">Controle suas locações direto pelo aplicativo de forma descomplicada.</Text>
      </Center>

      <VStack mt={96} gap={8}>
        <Button title="Começar" buttonVariant="solid" onPress={handleNavigateToDashboard} />
        <Button title="Voltar" buttonVariant="outline" onPress={handleGoBack} />
      </VStack>
    </VStack>
  )
}