import { Center, HStack, VStack, Image, Text } from "@gluestack-ui/themed";
import onBoardingImage from '@assets/onBoarding.jpg';
import { Button } from "@components/Button";

import { useNavigation } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

export function Onboarding() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleNavigateToSignIn() {
    navigation.navigate('signIn');
  }

  function handleNavigateToSignUp() {
    navigation.navigate('signUp');
  }

  return (
    <VStack flex={1} px={16} py={40}>
      <Center flex={1}>
        <Image source={onBoardingImage} alt="Onboarding" width={256} height={256} />

        <Text fontSize="$2xl" fontFamily="$heading" color="$textDark800" mt={24}>Bem vindo ao Loquei</Text>
        <Text fontFamily="$body" fontSize="$md" color="$textDark800" mt={12}>A maneira mais simples e rápida de alugar qualquer coisa. Entre com sua conta e descubra um mundo de facilidades.</Text>
      </Center>

      <VStack mt={96} gap={8}>
        <Button title="Começar" buttonVariant="solid" onPress={handleNavigateToSignUp} />
        <Button title="Já tenho conta" buttonVariant="outline" onPress={handleNavigateToSignIn} />
      </VStack>
    </VStack>
  )
}