import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

export function Loading() {
  return (
    <View style={styles.container}>
      <Text>Carregando</Text>
      <ActivityIndicator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
});
