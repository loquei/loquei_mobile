import { theme } from "@/styles/theme";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
export const SingIn = () => {
  return (
    <View>
      <Image
        source={require("../../assets/SingInImage.png")}
        style={styles.image}
      />
      <Text style={styles.title}>Aluge direto pelo seu celular!</Text>
      <Text style={styles.subTitle}>
        Faça uma negociação em nossa plataforma e {"\n"} alugue o que desejar
        sem dificuldades.
      </Text>

      <TouchableOpacity style={styles.singInButton}>
        <Text style={styles.singInButtonText}>Começar agora</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  subTitle: {
    alignItems: "center",
    fontSize: 15,
    marginTop: 16,
    marginBottom: 32,
  },
  singInButton: {
    backgroundColor: `${theme.colors.primary300}`,
    padding: 16,
    borderRadius: 8,
  },
  singInButtonText: {
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
    color: `${theme.colors.white100}`,
  },
  image: {
    alignSelf: "center",
    width: 350,
    height: 350,
    marginBottom: 64,
  },
});
