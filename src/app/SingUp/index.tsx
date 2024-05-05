import { theme } from "@/styles/theme";
import { useForm, Controller } from "react-hook-form";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from "react-native";

export const SingUp = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const handleSingUp = (data: Email) => {
    console.log(data.email);
  };

  return (
    <View>
      <Text style={styles.title}>Bem Vindo!</Text>
      <Text style={styles.subTitle}>
        Insira seu email e deixe o resto com a gente.
      </Text>
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
          <TextInput
            placeholder="Email"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            style={styles.emailInput}
          />
        )}
      />
      {errors.email && (
        <Text style={styles.erroMessage}>{errors.email.message}</Text>
      )}
      <Text
        onPress={() => Linking.openURL("./SingIn")}
        style={styles.newAccount}
      >
        criar uma conta
      </Text>
      <TouchableOpacity
        style={styles.singUpButton}
        onPress={handleSubmit(handleSingUp)}
      >
        <Text style={styles.singUpButtonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: theme.colors.gray800,
    fontWeight: "700",
  },
  subTitle: {
    fontSize: 16,
    marginTop: 8,
    marginBottom: 64,
    fontWeight: "500",
  },
  emailInput: {
    borderRadius: 8,
    padding: 12,
    borderColor: `${theme.colors.gray800}`,
    borderWidth: 0.5,
    fontWeight: "bold",
  },
  newAccount: {
    fontSize: 15,
    alignSelf: "flex-end",
    marginTop: 8,
    marginBottom: 8,
    color: `${theme.colors.secondary100}`,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  singUpButton: {
    backgroundColor: `${theme.colors.primary300}`,
    padding: 8,
    borderRadius: 8,
  },
  singUpButtonText: {
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
    color: `${theme.colors.white100}`,
  },
  erroMessage: {
    color: `${theme.colors.danger100}`,
    fontWeight: "500",
    marginTop: 16,
    marginBottom: 8,
  },
});
