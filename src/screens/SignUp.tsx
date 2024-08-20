import { Input } from "@components/Input";
import { Center, HStack, VStack, Text, Image, ScrollView } from "@gluestack-ui/themed";
import logoImage from '@assets/logo.png'
import { Button } from "@components/Button";

export function SignUp() {
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

            <VStack gap={8}>
              <Text fontFamily="$body" fontSize="$md" color="$textDark800">CPF</Text>
              <Input placeholder="Digite seu CPF" keyboardType="numbers-and-punctuation" />
            </VStack>

            <VStack gap={8}>
              <Text fontFamily="$body" fontSize="$md" color="$textDark800">Data de nascimento</Text>
              <Input placeholder="Digite sua data de nascimento" keyboardType="numeric" />
            </VStack>

            <VStack gap={8}>
              <Text fontFamily="$body" fontSize="$md" color="$textDark800">Senha</Text>
              <Input placeholder="Digite sua senha" type="password" />
            </VStack>

            <VStack gap={8}>
              <Text fontFamily="$body" fontSize="$md" color="$textDark800">Confirme sua senha</Text>
              <Input placeholder="Digite sua senha novamente" type="password" />
            </VStack>

            <Button title="Entrar" onPress={() => { }} />

            <Text fontFamily="$body" fontSize="$md" color="$textDark800" textAlign="center" mt={30}>Já tem uma conta? <Text color="$teal600" onPress={() => { }}>Entre agora</Text></Text>
          </VStack>
        </Center>
      </VStack>
    </ScrollView>
  )
}