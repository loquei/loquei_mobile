import { GluestackUIProvider, Text, Center, VStack } from '@gluestack-ui/themed'
import { config } from './config/gluestack-ui.config';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins'

import { ActivityIndicator, AppState, AppStateStatus, SafeAreaView, StatusBar } from 'react-native'
import { Routes } from '@routes/index'
import { QueryClient, QueryClientProvider, focusManager, onlineManager, QueryCache } from '@tanstack/react-query';
import NetInfo from '@react-native-community/netinfo';
import { useEffect } from 'react';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  })

  const queryClient = new QueryClient({
    queryCache: new QueryCache(),
  });

  useEffect(() => {
    onlineManager.setEventListener((setOnline) => {
      return NetInfo.addEventListener((state) => {
        setOnline(!!state.isConnected);
      });
    });
  }, [NetInfo, onlineManager]);

  useEffect(() => {
    const subscriber = AppState.addEventListener('change', onFocusRefetch);

    return () => {
      subscriber.remove();
    };
  }, []);

  const onFocusRefetch = (status: AppStateStatus) => {
    focusManager.setFocused(status === 'active');
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F5F5" }}>
      <GluestackUIProvider config={config}>
        <StatusBar barStyle='dark-content' backgroundColor="white" />
        {
          fontsLoaded ? (
            <QueryClientProvider client={queryClient}>
              <Routes />
            </QueryClientProvider>
          )
            :
            <ActivityIndicator size="large" color="#00AB9B" style={{ flex: 1 }} />
        }
      </GluestackUIProvider>
    </SafeAreaView>
  );
}