import { SafeAreaView, StatusBar, StyleSheet, Text } from 'react-native';
import { Slot } from 'expo-router';

import { Loading } from '@/components/Loading'

import {
  useFonts,
  Poppins_100Thin,
  Poppins_200ExtraLight,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_900Black
} from '@expo-google-fonts/poppins'
import { theme } from '@/theme';
import { ThemeProvider } from 'styled-components';

export default function Layout() {

  const [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_200ExtraLight,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_900Black
  })

  if (!fontsLoaded) {
    return <Loading />
  }

  return (
    // Todas as screens vao herdar essa estrutura, com SafeAreaView e Slot
    // Slot é onde o conteúdo da screen vai ser renderizado
    // SafeAreaView é uma View que respeita o padding do dispositivo, para não cortar o conteúdo, e também respeita a barra de status
    // _Layout é um componente que vai ser usado como layout padrão para todas as screens
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#000000" barStyle="light-content" />
      <ThemeProvider theme={theme}>
        <Slot />
      </ThemeProvider>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: 15,

    backgroundColor: theme.colors.gray50,
    height: '100%',
  },
})