import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";
import { theme } from "@/styles/theme";
import { ThemeProvider } from "styled-components";
import { SingIn } from "./SingIn";

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
        <SingIn />
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
});
