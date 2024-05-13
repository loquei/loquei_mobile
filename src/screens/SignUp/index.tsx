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
} from "../SignIn/styles";

export default function SignIn() {
  const router = useNavigation();

  const handleSingUp = () => {
    router.navigate("Home");
  };

  return (
    <Container>
      <Text style={Heading.H1}>Crie uma conta</Text>
      <Subtitle style={Heading.body}>
        Insira seu email e deixe o resto com a gente.
      </Subtitle>

      <EmailInput placeholder="Email" />

      <NewAccount onPress={() => router.navigate("SignIn")}>
        Já tem uma conta? Faça login
      </NewAccount>
      <SignInButton onPress={handleSingUp}>
        <SignInButtonText>Criar conta</SignInButtonText>
      </SignInButton>
    </Container>
  );
}
