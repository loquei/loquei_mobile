import {
  PrincipalText,
  CodeInput,
  Container,
  Subtitle,
  ConfirmarButton,
  TextConfirmar,
} from "./styles";
import { useNavigation } from "@react-navigation/native";

export default function ConfirmCode() {
  const router = useNavigation();
  return (
    <Container>
      <PrincipalText>Código de confirmação</PrincipalText>
      <Subtitle>
        Nós te enviamos um código no email, verifique seu email por favor
      </Subtitle>
      <CodeInput />
      <ConfirmarButton onPress={() => router.navigate("Home")}>
        <TextConfirmar>Confirmar</TextConfirmar>
      </ConfirmarButton>
    </Container>
  );
}
