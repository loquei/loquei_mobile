import { GluestackUIProvider, Text, Center, VStack } from '@gluestack-ui/themed'
import { config } from '@gluestack-ui/config'

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins'
import { StatusBar } from 'react-native'
import { Routes } from '@routes/index'

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  })

  return (
    <GluestackUIProvider config={config}>
      <StatusBar barStyle='dark-content' backgroundColor="white" />
      {
        fontsLoaded ? (
          <Routes />
        )
          :
          <Center flex={1} bg='$backgroundLight50'>
            <Text color='$white' fontFamily="$body" size="md">Loading...</Text>
          </Center>
      }
    </GluestackUIProvider>
  );
}