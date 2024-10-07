import { Input } from "@components/Input";
import {
  Center,
  HStack,
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
import { postEmail } from "../api/postEmail";
import AsyncStorage from "@react-native-async-storage/async-storage";
export function SignIn() {
  type PostEmailSchema = y.InferType<typeof PostEmailSchema>;
  const authNavigation = useNavigation<AuthNavigatorRoutesProps>();
  const appNavigation = useNavigation<AppSecondaryNavigatorRoutesProps>();

  function handleNavigateToSignUp() {
    authNavigation.navigate("signUp");
  }

  function handleNavitageToHome() {
    authNavigation.navigate("primaryRoutes");
  }

  const getEmail = async () => {
    const email = await AsyncStorage.getItem("userEmail");
    return email;
  };

  {
    /*const handleLogin = async ({ email }: { email: string }) => {
    try {
      const Useremail = await getEmail();
      if (!Useremail) {
        await AsyncStorage.setItem("userEmail", email);
      }
      postEmail({ email });
      handleNavitageToHome();
    } catch (e: any) {
      console.log(e);
    }
  };
*/
  }

  const { control, handleSubmit } = useForm<PostEmailSchema>({
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
                name="email"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onBlur, onChange } }) => (
                  <Input
                    placeholder="Digite seu email"
                    keyboardType="email-address"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                  />
                )}
              />
            </VStack>

            <Button title="Entrar" onPress={() => handleNavitageToHome()} />

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
