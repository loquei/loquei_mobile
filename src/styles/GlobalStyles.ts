import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export const Heading = StyleSheet.create({
  H1: {
    fontSize: theme.fontSizes.text2XL,
    fontFamily: "Poppins_700Bold",
  },

  H2: {
    fontSize: theme.fontSizes.textXL,
    fontFamily: "Poppins_700Bold",
  },

  H3: {
    fontSize: theme.fontSizes.textLG,
    fontFamily: "Poppins_500Medium",
  },

  body: {
    fontSize: theme.fontSizes.textBase,
    fontFamily: "Poppins_400Regular",
  },

  caption: {
    fontSize: theme.fontSizes.textSM,
    fontFamily: "Poppins_400Regular",
  },

  small: {
    fontSize: theme.fontSizes.textXS,
    fontFamily: "Poppins_400Regular",
  },

  defaultText: {
    fontSize: theme.fontSizes.textBase,
  }
})