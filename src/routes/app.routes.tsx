import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "@/screens/Home";
import Onboarding from "@/screens/Onboarding";
import SignIn from "@/screens/SignIn";
import SignUp from "@/screens/SignUp";
import { theme } from "@/theme";
import ConfirmCode from "@/screens/ConfirmCode";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        statusBarColor: theme.colors.gray800,
        contentStyle: { backgroundColor: theme.colors.gray50 },
      }}
    >
      <Screen name="Onboarding" component={Onboarding} />
      <Screen name="SignIn" component={SignIn} />
      <Screen name="Home" component={Home} />
      <Screen name="SignUp" component={SignUp} />
      <Screen name="ConfirmCode" component={ConfirmCode} />
    </Navigator>
  );
}
