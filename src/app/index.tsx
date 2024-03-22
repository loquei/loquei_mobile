import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";
import { MaterialIcons } from "@expo/vector-icons";
import { theme } from "@/styles/theme";
import { ThemeProvider } from "styled-components";

export default function Home() {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <ThemeProvider theme={theme}>
      <View style={styles.container}>
        <Text style={styles.text}>
          Open up App.tsx to start working on your app!
        </Text>
        <MaterialIcons name="cell-wifi" size={75} color={"red"} />
        <StatusBar style="auto" />
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    fontFamily: "Poppins_400Regular",
    fontWeight: "400",
    flex: 1,
    backgroundColor: `${theme.colors.gray50}`,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: `${theme.colors.primary200}`,
  },
});
