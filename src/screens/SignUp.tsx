import { Input } from "@components/Input";
import { Center, VStack, Text, Image, ScrollView } from "@gluestack-ui/themed";
import logoImage from "@assets/logo.png";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { ScreenHeader } from "@components/ScreenHeader";
import { useForm, Controller } from "react-hook-form";
import { CreateAccountSchema } from "../schemas/CreateAccountSchema";
import { yupResolver } from '@hookform/resolvers/yup'; // Importando o resolver do yup
import AsyncStorage from "@react-native-async-storage/async-storage";
import { postEmail } from "../api/postEmail";
import { createUser } from "../api/createUser";
import * as y from "yup";
import { cpfMask, phoneMask, dateMask } from "../utils/masks";
import Toast from 'react-native-toast-message';

export function SignUp() {
  type CreateAccountSchema = y.InferType<typeof CreateAccountSchema>;
  const authNavigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleNavigateToSignIn() {
    authNavigation.navigate("signIn");
  }

  function handleNavigateToCodeVerification() {
    authNavigation.navigate("codeVerification");
  }

  const showToast = (message: string) => {
    Toast.show({
      type: 'error',
      text1: 'Erro',
      text2: message
    });
  };

  const { control, handleSubmit, formState: { errors } } = useForm<CreateAccountSchema>({
    resolver: yupResolver(CreateAccountSchema),
    defaultValues: {
      personal_name: "",
      username: "",
      email: "",
      phone: "",
      document: "",
      birth: "",
    },
  });

  const handleCreateAccount = async (data: CreateAccountSchema) => {
    try {
      const { personal_name, username, email, phone, document, birth } = data;

      const formatDateToISO = (date: string) => {
        const [day, month, year] = date.split("/");
        return `${year}-${month}-${day}`;
      };

      const personalNameWithoutWhiteSpace = personal_name.trim();
      const userNameWithoutWhiteSpace = username.trim();
      const emailWithoutWhiteSpace = email.trim();
      const phoneWithoutWhiteSpace = phone.trim();

      const BirthIso = formatDateToISO(data.birth);

      console.log("Datos a enviar", personalNameWithoutWhiteSpace, userNameWithoutWhiteSpace, emailWithoutWhiteSpace, phoneWithoutWhiteSpace, document, BirthIso);

      const response = await createUser({
        personal_name: personalNameWithoutWhiteSpace,
        username: userNameWithoutWhiteSpace,
        email: emailWithoutWhiteSpace,
        phone: phoneWithoutWhiteSpace,
        document,
        birth: BirthIso,
      });

      if (response.success) {
        await AsyncStorage.setItem("userEmail", email);

        await postEmail({ email });

        handleNavigateToCodeVerification();
      } else {
        if (response.errors) {
          response.errors.forEach((err: { message: string }) => {
            if (err.message.includes("Username already exists")) {
              showToast("Este nome de usuário já está cadastrado.");
            } else if (err.message.includes("Email already exists")) {
              showToast("Este e-mail já está cadastrado.");
            } else if (err.message.includes("Document already exists")) {
              showToast("Este documento já está cadastrado.");
            } else if (err.message.includes("Phone already exists")) {
              showToast("Este telefone já está cadastrado.");
            } else {
              showToast("Ocorreu um erro ao criar a conta. Tente novamente.");
            }
          });
        } else if (response.message) {
          showToast(response.message);
        }
      }
    } catch (error: any) {
      showToast("Ocorreu um erro ao criar a conta. Tente novamente.");
      console.log("Erro ao criar a conta:", error);
    }
  };


  return (
    <>
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
                  name="personal_name"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      <Input
                        placeholder="João da Silva"
                        type="text"
                        value={value}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        errorMessage={errors.personal_name?.message}
                      />
                    </>
                  )}
                />
              </VStack>

              <VStack gap={8}>
                <Text fontFamily="$body" fontSize="$md" color="$textDark800">
                  Nome de usuário
                </Text>

                <Controller
                  control={control}
                  name="username"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      <Input
                        placeholder="joao_silva"
                        type="text"
                        value={value}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        errorMessage={errors.username?.message}
                      />
                    </>
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
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      <Input
                        placeholder="ex: seuemail@gmail.com"
                        keyboardType="email-address"
                        value={value}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        errorMessage={errors.email?.message}
                      />
                    </>
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
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      <Input
                        placeholder="999.999.999-99"
                        keyboardType="number-pad"
                        value={value}
                        onBlur={onBlur}
                        onChangeText={(text) => onChange(cpfMask(text))}
                        errorMessage={errors.document?.message}
                      />
                    </>
                  )}
                />
              </VStack>

              <VStack gap={8}>
                <Text fontFamily="$body" fontSize="$md" color="$textDark800">
                  Data de nascimento
                </Text>
                <Controller
                  control={control}
                  name="birth"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      <Input
                        placeholder="DD/MM/AAAA"
                        keyboardType="number-pad"
                        value={value}
                        onBlur={onBlur}
                        onChangeText={(text) => onChange(dateMask(text))}
                        errorMessage={errors.birth?.message}
                      />
                    </>
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
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      <Input
                        placeholder="11999999999"
                        keyboardType="phone-pad"
                        maxLength={11}
                        value={value}
                        onBlur={onBlur}
                        onChangeText={(text) => onChange(text)}
                        errorMessage={errors.phone?.message}
                      />
                    </>
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
                <Text color="$teal600" onPress={handleNavigateToSignIn}>
                  Entre agora
                </Text>
              </Text>
            </VStack>
          </Center>
        </VStack>

      </ScrollView>
      <Toast />
    </>
  );
}