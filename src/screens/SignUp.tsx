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

export function SignUp() {
  type CreateAccountSchema = y.InferType<typeof CreateAccountSchema>;
  const authNavigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleNavigateToSignIn() {
    authNavigation.navigate("signIn");
  }

  function handleNavigateToCodeVerification() {
    authNavigation.navigate("codeVerification");
  }

  const { control, handleSubmit, formState: { errors } } = useForm<CreateAccountSchema>({
    resolver: yupResolver(CreateAccountSchema),
    defaultValues: {
      username: "",
      personal_name: "",
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

      const BirthIso = formatDateToISO(data.birth);

      await createUser({
        username,
        personal_name,
        email,
        phone,
        document,
        birth: BirthIso,
      });

      await AsyncStorage.setItem("userEmail", email);

      await postEmail({ email });
      handleNavigateToCodeVerification();
    } catch (error) {
      console.error("Erro ao criar conta ou enviar e-mail:", error);
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
                      placeholder="(99) 99999-9999"
                      keyboardType="phone-pad"
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
  );
}
