import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import { Home } from '@screens/Home';
import { Search } from '@screens/Search';
import { Wishlist } from '@screens/Wishlist';
import { Profile } from '@screens/Profile';

import { gluestackUIConfig } from '../../config/gluestack-ui.config'

import { Home as HomeIcon, Search as SearchIcon, Heart as HeartIcon, UserCircle as UserCircleIcon } from 'lucide-react-native'
import { Platform } from 'react-native';

type AppSecondaryRoutes = {
  home: undefined;
  search: undefined;
  wishlist: undefined;
  profile: undefined;
}

export type AppSecondaryNavigatorRoutesProps = BottomTabNavigationProp<AppSecondaryRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppSecondaryRoutes>();

export function AppSecondaryRoutes() {
  const { tokens } = gluestackUIConfig
  const iconSize = tokens.space['6']

  return (
    <Navigator screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarActiveTintColor: tokens.colors.green500,
      tabBarInactiveTintColor: tokens.colors.blueGray200,
      tabBarStyle: {
        backgroundColor: tokens.colors.blueGray600,
        borderTopWidth: 0,
        height: Platform.OS === 'android' ? 'auto' : 96, // Android needs this to be auto, iOS needs this to be 96, because of the SafeAreaView padding on iOS
        paddingBottom: tokens.space['10'],
        paddingTop: tokens.space['6'],
      },
    }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeIcon stroke={color} width={iconSize} height={iconSize} />
          ),
        }}
      />
      <Screen
        name="search"
        component={Search}
        options={{
          tabBarIcon: ({ color }) => (
            <SearchIcon stroke={color} width={iconSize} height={iconSize} />
          ),
        }}
      />
      <Screen
        name="wishlist"
        component={Wishlist}
        options={{
          tabBarIcon: ({ color }) => (
            <HeartIcon stroke={color} width={iconSize} height={iconSize} />
          ),
        }}
      />
      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <UserCircleIcon stroke={color} width={iconSize} height={iconSize} />
          ),
        }}
      />
    </Navigator>
  );
}