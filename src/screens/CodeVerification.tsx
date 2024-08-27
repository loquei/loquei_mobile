import { Input } from "@components/Input";
import { Center, HStack, VStack, Text, Image, ScrollView } from "@gluestack-ui/themed";
import { useNavigation } from '@react-navigation/native'
import mobileCode from '@assets/mobileSecurity.png'
import { Button } from "@components/Button";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { ScreenHeader } from "@components/ScreenHeader";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";

export function CodeVerification() {
  const authNavigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleNavitageToHome() {
    authNavigation.navigate('primaryRoutes');
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <ScreenHeader title="Verificação" backButton />
      <VStack flex={1} px={16} py={40}>
        <Center flex={1}>
          <Image source={mobileCode} alt="Código de verificação" width={128} height={128} />
          <VStack mt={40}>
            <Center>
              <Text fontFamily="$heading" fontSize="$2xl" color="$textDark800">Código de verificação</Text>
              <Text fontFamily="$body" fontSize="$md" color="$textDark800" mt={12}>Por favor, insira o código de verificação de 4 dígitos que foi enviado para o seu endereço de e-mail registrado.</Text>
            </Center>
          </VStack>

          <VStack mt={48} w="$full">
            <VStack gap={8}>
              <Text fontFamily="$body" fontSize="$md" color="$textDark800">Código de verificação</Text>
              <Input placeholder="Insira o código" keyboardType="numeric" />
            </VStack>

            <Button title="Verificar" onPress={handleNavitageToHome} />

            <HStack mt={12}>
              <Text fontFamily="$body" fontSize="$md" color="$textDark800" textDecorationLine="underline">Reenviar código</Text>
            </HStack>
          </VStack>
        </Center>
      </VStack>
    </ScrollView>
  )
}