import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { Heading } from "@/styles/GlobalStyles";

import { Text } from "react-native";

import {
  Container,
  Subtitle,
  EmailInput,
  NewAccount,
  SignInButton,
  SignInButtonText,
  ErrorMessage,
} from "./styles";

export default function SignIn() {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const router = useNavigation();
  const handleSingUp = () => {
    router.navigate("Home");
  };

  return (
    <Container>
      <Text style={Heading.H1}>Bem Vindo!</Text>
      <Subtitle style={Heading.body}>
        Insira seu email e deixe o resto com a gente.
      </Subtitle>
      <Controller
        control={control}
        name="email"
        rules={{
          required: "É necessario digitar um email!",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Digite um email válido",
          },
          validate: (value) =>
            value === "teste@email.com" || "O email não existe",
        }}
        render={({ field: { onChange, value, onBlur } }) => (
          <EmailInput
            placeholder="Email"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
          />
        )}
      />
      {errors.email && (
        <ErrorMessage style={Heading.caption}>
          {errors.email.message}
        </ErrorMessage>
      )}

      <NewAccount onPress={() => router.navigate("SignUp")}>
        Criar uma conta
      </NewAccount>
      <SignInButton onPress={handleSubmit(handleSingUp)}>
        <SignInButtonText>Entrar</SignInButtonText>
      </SignInButton>
    </Container>
  );
}
