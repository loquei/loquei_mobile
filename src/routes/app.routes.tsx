import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "@/app/Home";
import Onboarding from "@/app/Onboarding";
import SignIn from "@/app/SignIn";
import SignUp from "@/app/SignUp";
import { theme } from "@/theme";

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
    </Navigator>
  );
}
