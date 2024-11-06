import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";
import { Box } from "@gluestack-ui/themed";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ModalProvider } from '@contexts/ModalContext';

export function Routes() {
  const theme = DefaultTheme;
  theme.colors.background = gluestackUIConfig.tokens.colors.backgroundLight50;

  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      const authToken = await AsyncStorage.getItem("AuthToken");
      setIsUserAuthenticated(!!authToken);
      console.log("authToken", authToken);
    };

    checkAuthentication();
  }, []);

  return (
    <Box flex={1} bg="$backgroundLight50" bgColor="$backgroundLight50">
      <ModalProvider>
        <NavigationContainer theme={theme}>
          {isUserAuthenticated ? <AppRoutes /> : <AuthRoutes />}
        </NavigationContainer>
      </ModalProvider>
    </Box>
  );
}
