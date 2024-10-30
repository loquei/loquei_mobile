import { Input } from "@components/Input";
import {
  Center,
  VStack,
  Text,
  Image,
  ScrollView,
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import logoImage from "@assets/logo.png";
import { Button } from "@components/Button";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { AppSecondaryNavigatorRoutesProps } from "@routes/app.secondary.routes";
import { ScreenHeader } from "@components/ScreenHeader";
import { useForm, Controller } from "react-hook-form";
import * as y from "yup";
import { PostEmailSchema } from "../schemas/PostEmailSchema";
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { postEmail } from "../api/postEmail";
import Toast from 'react-native-toast-message';

export function SignIn() {
  type PostEmailSchema = y.InferType<typeof PostEmailSchema>;
  const authNavigation = useNavigation<AuthNavigatorRoutesProps>();
  const appNavigation = useNavigation<AppSecondaryNavigatorRoutesProps>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function handleNavigateToSignUp() {
    authNavigation.navigate("signUp");
  }

  const showToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Erro ao enviar o email',
      text2: 'O email não foi encontrado. Verifique o endereço de email.',
    });
  }

  const handleLogin = async (data: PostEmailSchema) => {
    try {

      setErrorMessage(null);

      const response = await postEmail(data);

      if (response === 200) {
        await AsyncStorage.setItem("userEmail", data.email);
        authNavigation.navigate("codeVerification");
      } else if (response === 404) {
        setErrorMessage("Email não encontrado. Verifique o endereço de email.");
        console.log(errorMessage);
        showToast();
      } else {
        setErrorMessage("Erro ao enviar o email. Tente novamente mais tarde.");
        console.log(errorMessage);
      }

    } catch (error: any) {

      setErrorMessage("Ocorreu um erro ao tentar fazer login. Tente novamente.");
      console.log("Erro de login:", error);
    }
  };

  const { control, handleSubmit, formState: { errors } } = useForm<PostEmailSchema>({
    resolver: yupResolver(PostEmailSchema),
    defaultValues: {
      email: "",
    },
  });

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <ScreenHeader title="Login" backButton />
      <Toast />
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

            <Button title="Entrar" onPress={handleSubmit(handleLogin)} />

            <Text
              fontFamily="$body"
              fontSize="$md"
              color="$textDark800"
              textAlign="center"
              mt={30}
            >
              Ainda não tem uma conta?{" "}
              <Text color="$teal600" onPress={handleNavigateToSignUp}>
                Cadastre-se
              </Text>
            </Text>
          </VStack>
        </Center>
      </VStack>
    </ScrollView>
  );
}
