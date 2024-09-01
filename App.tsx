import { GluestackUIProvider, Text, Center, VStack } from '@gluestack-ui/themed'
import { config } from './config/gluestack-ui.config';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins'

import { ActivityIndicator, SafeAreaView, StatusBar } from 'react-native'
import { Routes } from '@routes/index'

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  })

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F5F5" }}>
      <GluestackUIProvider config={config}>
        <StatusBar barStyle='dark-content' backgroundColor="white" />
        {
          fontsLoaded ? (
            <Routes />
          )
            :
            <ActivityIndicator size="large" color="#00AB9B" style={{ flex: 1 }} />
        }
      </GluestackUIProvider>
    </SafeAreaView>
  );
}