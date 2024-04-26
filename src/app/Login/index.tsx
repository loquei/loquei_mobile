import { theme } from "@/styles/theme";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from "react-native";

export const Login = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (text: Email) => {
    setEmail(text);
  };

  const handleSubmit = () => {};

  return (
    <View>
      <Text style={styles.title}>Bem Vindo!</Text>
      <Text style={styles.subTitle}>
        Insira seu email e deixe o resto com a gente.
      </Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={handleEmailChange}
        style={styles.emailInput}
      />
      <Text
        onPress={() => Linking.openURL("./SingIn")}
        style={styles.newAccount}
      >
        criar uma conta
      </Text>
      <TouchableOpacity style={styles.singInButton} onPress={handleSubmit}>
        <Text style={styles.singInButtonText}>Entrar</Text>
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
  singInButton: {
    backgroundColor: `${theme.colors.primary300}`,
    padding: 8,
    borderRadius: 8,
  },
  singInButtonText: {
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
    color: `${theme.colors.white100}`,
  },
});
