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
import mobileCode from "@assets/mobileSecurity.png";
import { Button } from "@components/Button";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { ScreenHeader } from "@components/ScreenHeader";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SendCodeSchema } from "../schemas/SendCodeSchema";
import { postCode } from "../api/postCode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as y from "yup";
import { ListUsers } from "../api/listUsers";

export function CodeVerification() {
  type SendCodeSchema = y.InferType<typeof SendCodeSchema>;
  const authNavigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleNavitageToHome() {
    authNavigation.navigate("primaryRoutes");
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SendCodeSchema>({
    resolver: yupResolver(SendCodeSchema),
    defaultValues: {
      code: "",
    },
  });

  const getEmail = async () => {
    const email = await AsyncStorage.getItem("userEmail");
    return email;
  };

  const handleSendCode = async ({ code }: { code: string }) => {
    try {
      const email = await getEmail();
      if (email) {
        await postCode({
          code,
          email,
        });
        await AsyncStorage.setItem("currentUserEmail", email);
        handleNavitageToHome();
      }
    } catch (e: any) {
      console.log(e);
    }

    // await ListUsers();

  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <ScreenHeader title="Verificação" backButton />
      <VStack flex={1} px={16} py={40}>
        <Center flex={1}>
          <Image
            source={mobileCode}
            alt="Código de verificação"
            width={128}
            height={128}
          />
          <VStack mt={40}>
            <Center>
              <Text fontFamily="$heading" fontSize="$2xl" color="$textDark800">
                Código de verificação
              </Text>
              <Text
                fontFamily="$body"
                fontSize="$md"
                color="$textDark800"
                mt={12}
              >
                Por favor, insira o código de verificação de 6 dígitos que foi
                enviado para o seu endereço de e-mail registrado.
              </Text>
            </Center>
          </VStack>

          <VStack mt={48} w="$full">
            <VStack gap={8}>
              <Text fontFamily="$body" fontSize="$md" color="$textDark800">
                Código de verificação
              </Text>

              <Controller
                control={control}
                name="code"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder="Insira o código"
                    keyboardType="numeric"
                    onChangeText={onChange}
                    value={value}
                    onBlur={onBlur}
                    errorMessage={errors.code?.message}
                  />
                )}
              />
            </VStack>

            <Button title="Verificar" onPress={handleSubmit(handleSendCode)} />

            <HStack mt={12}>
              <Text
                fontFamily="$body"
                fontSize="$md"
                color="$textDark800"
                textDecorationLine="underline"
              >
                Reenviar código
              </Text>
            </HStack>
          </VStack>
        </Center>
      </VStack>
    </ScrollView>
  );
}