import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from 'styled-components';

import { Loading } from '@/components/Loading';
import { theme } from '@/theme';

import Home from '@/app/Home';
import Onboarding from '@/app/Onboarding';
import SignIn from '@/app/SignIn';
import SignUp from '@/app/SignUp';

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
} from '@expo-google-fonts/poppins';

export default function App() {
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
  });

  if (!fontsLoaded) {
    return <Loading />;
  }

  const Stack = createNativeStackNavigator();

  return (
    <View style={styles.container}>
      <ThemeProvider theme={theme}>
        <Stack.Navigator
          screenOptions={{
            statusBarStyle: 'light',
            statusBarColor: theme.colors.gray800,
            contentStyle: { backgroundColor: theme.colors.gray50 },
            headerShown: false,
          }}
          initialRouteName='Onboarding'>
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      </ThemeProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray50,
    marginTop: 10,
  },
});