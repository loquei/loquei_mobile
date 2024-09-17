import { Input } from "@components/Input";
import { Center, VStack, Text, Image, ScrollView } from "@gluestack-ui/themed";
import logoImage from "@assets/logo.png";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { ScreenHeader } from "@components/ScreenHeader";
import { useForm, Controller } from "react-hook-form";
import * as y from "yup";
import { CreateAccountSchema } from "../schemas/CreateAccountSchema";
import { createUser } from "../api/createUser";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function SignUp() {
  type CreateAccountSchema = y.InferType<typeof CreateAccountSchema>;
  const authNavigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleNavigateToCodeVerification() {
    authNavigation.navigate("codeVerification");
  }

  const { control, handleSubmit } = useForm<CreateAccountSchema>({
    defaultValues: {
      name: "",
      nickname: "",
      email: "",
      phone: "",
      document: "",
      birthday: "",
    },
  });

  const handleCreateAccount = async (data: CreateAccountSchema) => {
    try {
      const { name, nickname, email, phone, document, birthday } = data;
      await createUser({
        name,
        nickname,
        email,
        phone,
        document,
        birthday,
      });
      await AsyncStorage.setItem("userEmail", email);
      handleNavigateToCodeVerification();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <ScreenHeader title="Cadastro" backButton />
      <VStack flex={1} px={16} py={40}>
        <Center flex={1}>
          <VStack>
            <Center>
              <Image source={logoImage} alt="Loquei" width={54} height={54} />
              <Text
                fontFamily="$heading"
                fontSize="$2xl"
                color="$textDark800"
                mt={40}
              >
                Entre em sua conta
              </Text>
              <Text
                fontFamily="$body"
                fontSize="$md"
                color="$textDark800"
                textAlign="center"
                mt={12}
              >
                A maneira mais simples e rápida de alugar qualquer coisa. Entre
                com sua conta e descubra um mundo de facilidades.
              </Text>
            </Center>
          </VStack>

          <VStack mt={48} w="$full">
            <VStack gap={8}>
              <Text fontFamily="$body" fontSize="$md" color="$textDark800">
                Nome
              </Text>

              <Controller
                control={control}
                name="name"
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder="João da Silva"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
            </VStack>

            <VStack gap={8}>
              <Text fontFamily="$body" fontSize="$md" color="$textDark800">
                Nome de usuário
              </Text>

              <Controller
                control={control}
                name="nickname"
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder="João do gás"
                    type="text"
                    onBlur={onBlur}
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
            </VStack>

            <VStack gap={8}>
              <Text fontFamily="$body" fontSize="$md" color="$textDark800">
                Email
              </Text>

              <Controller
                control={control}
                name="email"
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder="ex: seuemial@gmail.com"
                    keyboardType="email-address"
                    onBlur={onBlur}
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
            </VStack>

            <VStack gap={8}>
              <Text fontFamily="$body" fontSize="$md" color="$textDark800">
                CPF
              </Text>
              <Controller
                control={control}
                name="document"
                rules={{ required: true, maxLength: 11 }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder="99999999999"
                    keyboardType="numbers-and-punctuation"
                    maxLength={11}
                    onBlur={onBlur}
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
            </VStack>

            <VStack gap={8}>
              <Text fontFamily="$body" fontSize="$md" color="$textDark800">
                Data de nascimento
              </Text>
              <Controller
                control={control}
                name="birthday"
                render={({ field: { onBlur, onChange, value } }) => (
                  <Input
                    placeholder="31/05/2004"
                    keyboardType="numeric"
                    onBlur={onBlur}
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
            </VStack>

            <VStack gap={8}>
              <Text fontFamily="$body" fontSize="$md" color="$textDark800">
                Telefone
              </Text>
              <Controller
                control={control}
                name="phone"
                rules={{ required: true, maxLength: 14 }}
                render={({ field: { onBlur, onChange, value } }) => (
                  <Input
                    placeholder="8740028922"
                    keyboardType="phone-pad"
                    maxLength={14}
                    onBlur={onBlur}
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
            </VStack>

            <Button
              title="Entrar"
              onPress={handleSubmit(handleCreateAccount)}
            />

            <Text
              fontFamily="$body"
              fontSize="$md"
              color="$textDark800"
              textAlign="center"
              mt={30}
            >
              Já tem uma conta?{" "}
              <Text color="$teal600" onPress={() => {}}>
                Entre agora
              </Text>
            </Text>
          </VStack>
        </Center>
      </VStack>
    </ScrollView>
  );
}
