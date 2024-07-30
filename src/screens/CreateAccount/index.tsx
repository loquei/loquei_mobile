import {
  Container,
  CPFInput,
  CreateAccountButton,
  CreateAccountButtonText,
  EmailInput,
  Form,
  InputLabel,
  NameInput,
  NickNameInput,
  PhoneInput,
  Title,
} from "./styles";
import { useForm, Controller } from "react-hook-form";
import { CreateAccountSchema } from "../../schemas/CreateAccountSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput } from "react-native";

export default function CreateAccount() {
  type CreateAccountSchema = z.infer<typeof CreateAccountSchema>;

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateAccountSchema>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(CreateAccountSchema),
  });

  return (
    <Container>
      <Title>Crie a sua conta</Title>
      <Form>
        <InputLabel>Nome de usuario:</InputLabel>
        <Controller
          control={control}
          name="nickName"
          rules={{
            required: "É necessario digitar o seu nome de usuario",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <NickNameInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
        <InputLabel>Nome Completo:</InputLabel>
        <Controller
          control={control}
          name="name"
          rules={{
            required: "É necessario digitar o seu nome de usuario",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <NameInput value={value} onChangeText={onChange} onBlur={onBlur} />
          )}
        />
        <InputLabel>Email:</InputLabel>
        <Controller
          control={control}
          name="email"
          rules={{
            required: "É necessario digitar o seu e-email",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <EmailInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="email-address"
            />
          )}
        />
        <InputLabel>Telefone:</InputLabel>
        <Controller
          control={control}
          name="phone"
          rules={{
            required: "É necessario digitar o seu e-email",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <PhoneInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="phone-pad"
            />
          )}
        />
        <InputLabel>CPF:</InputLabel>
        <Controller
          control={control}
          name="CPF"
          rules={{
            required: "É necessario digitar o seu e-email",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <CPFInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="numeric"
            />
          )}
        />
        <InputLabel>Data de nascimento:</InputLabel>
        <Controller
          control={control}
          name="BirthDate"
          rules={{
            required: "É necessario digitar o seu e-email",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <CPFInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              textContentType="birthdate"
            />
          )}
        />
        <CreateAccountButton>
          <CreateAccountButtonText>Criar Conta</CreateAccountButtonText>
        </CreateAccountButton>
      </Form>
    </Container>
  );
}
