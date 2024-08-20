import { Input } from "@components/Input";
import { Center, HStack, VStack, Text, Image, ScrollView } from "@gluestack-ui/themed";
import { useNavigation } from '@react-navigation/native'
import logoImage from '@assets/logo.png'
import { Button } from "@components/Button";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { AppSecondaryNavigatorRoutesProps } from "@routes/app.secondary.routes";

export function SignIn() {
  const authNavigation = useNavigation<AuthNavigatorRoutesProps>();
  const appNavigation = useNavigation<AppSecondaryNavigatorRoutesProps>();

  function handleNavigateToSignUp() {
    authNavigation.navigate('signUp');
  }

  function handleNavitageToHome() {
    authNavigation.navigate('primaryRoutes');
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <VStack flex={1} px={16} py={40}>
        <Center flex={1}>
          <VStack>
            <Center>
              <Image source={logoImage} alt="Loquei" width={54} height={54} />
              <Text fontFamily="$heading" fontSize="$2xl" color="$textDark800" mt={40}>Entre em sua conta</Text>
              <Text fontFamily="$body" fontSize="$md" color="$textDark800" textAlign="center" mt={12}>A maneira mais simples e rápida de alugar qualquer coisa. Entre com sua conta e descubra um mundo de facilidades.</Text>
            </Center>
          </VStack>

          <VStack mt={48} w="$full">
            <VStack gap={8}>
              <Text fontFamily="$body" fontSize="$md" color="$textDark800">Email</Text>
              <Input placeholder="Digite seu email" keyboardType="email-address" />
            </VStack>

            <Button title="Entrar" onPress={handleNavitageToHome} />

            <HStack justifyContent="flex-end" mt={12}>
              <Text fontFamily="$body" fontSize="$md" color="$textDark800" textDecorationLine="underline">Recuperar senha</Text>
            </HStack>

            <Text fontFamily="$body" fontSize="$md" color="$textDark800" textAlign="center" mt={30}>Ainda não tem uma conta? <Text color="$teal600" onPress={handleNavigateToSignUp}>Cadastre-se</Text></Text>
          </VStack>
        </Center>
      </VStack>
    </ScrollView>
  )
}