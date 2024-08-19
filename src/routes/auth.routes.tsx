import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';
import { CodeVerification } from '@screens/CodeVerification';
import { Onboarding } from '@screens/Onboarding';
import { SignIn } from '@screens/SignIn';
import { SignUp } from '@screens/SignUp';

type AuthRoutes = {
  onBoarding: undefined;
  codeVerification: undefined;
  signIn: undefined;
  signUp: undefined;
}

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{
      headerShown: false,
    }}
      initialRouteName='onBoarding'
    >
      <Screen
        name="onBoarding"
        component={Onboarding}
      />

      <Screen
        name="signIn"
        component={SignIn}
      />

      <Screen
        name="signUp"
        component={SignUp}
      />
      <Screen
        name="codeVerification"
        component={CodeVerification}
      />
    </Navigator>
  )
}