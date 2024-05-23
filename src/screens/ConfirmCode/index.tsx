import {
  PrincipalText,
  CodeInput,
  Container,
  Subtitle,
  ConfirmarButton,
  TextConfirmar,
  ErroMensagem,
} from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";

export default function ConfirmCode() {
  const router = useNavigation();
  const handleValidateToken = () => {
    router.navigate("Home");
  };
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      token: "",
    },
  });
  return (
    <Container>
      <PrincipalText>Código de confirmação</PrincipalText>
      <Subtitle>
        Nós te enviamos um código no email, verifique seu email por favor
      </Subtitle>
      <Controller
        control={control}
        name="token"
        rules={{
          required: "Por favor insira o código do seu email!",
          pattern: /^[0-9]+$/,
          validate: (value) => {
            return value === "1234" ? true : "Código Invalido";
          },
        }}
        render={({ field: { onChange, value, onBlur } }) => (
          <CodeInput
            placeholder="Digite aqui o código"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            keyboardType="number-pad"
          />
        )}
      ></Controller>
      <ErroMensagem>{errors.token?.message}</ErroMensagem>
      <ConfirmarButton onPress={handleSubmit(handleValidateToken)}>
        <TextConfirmar>Confirmar</TextConfirmar>
      </ConfirmarButton>
    </Container>
  );
}
