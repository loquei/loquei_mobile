import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { AddProductStep1 } from "@screens/AddProductStep1";
import { AddProductStep2 } from "@screens/AddProductStep2";
import { AllOrders } from "@screens/AllOrders";
import { Dashboard } from "@screens/Dashboard";
import { EditProduct } from "@screens/EditProduct";
import { Leasing } from "@screens/Leasing";
import { OrderDetails } from "@screens/OrderDetails";
import { ProductDetails } from "@screens/ProductDetails";
import { ProductReviews } from "@screens/ProductReviews";
import { SearchCategory } from "@screens/SearchCategory";
import { SearchResults } from "@screens/SearchResults";
import { UserProducts } from "@screens/UserProducts";
import { Account } from "@screens/Account";
import { Address } from "@screens/Address";
import { Notifications } from "@screens/Notifications";
import { AddAddress } from "@screens/AddAddress";
import { AppSecondaryRoutes } from "./app.secondary.routes";
import { UseAuthRoutes } from "./useRoutes";
import { Calendar } from "@screens/Calendar";
import { Privacy } from "@screens/Privacy";
import { Help } from "@screens/Help";
import { About } from "@screens/About";
import { RentalHistory } from "@screens/RentalHistory";

export type AppSecondaryRoutes = {
  productDetails: { id: string };
  calendar: {
    itemId: string;
    lessorId: string;
    lesseeId: string;
    minDays: number;
    maxDays: number;
    filteredRentals: Array<{
      id: string;
      item: string;
      lessee: string;
      lessor: string;
      start_date: string;
      end_date: string;
      status: string;
      total_value: number;
    }>;
  };

  productReviews: {
    itemId: string;
    raterId: string;
    isItemOwner: boolean;
  };
  searchCategory: undefined;
  searchResults: { searchTerm: string };
  leasing: undefined;
  dashboard: undefined;
  userProducts: undefined;
  editProduct: { id: string };
  addProductStep1: undefined;
  addProductStep2: undefined;
  allOrders: undefined;
  orderDetails: { id: string };
  rentalHistory: { id?: string };
  account: undefined;
  addAddress: undefined;
  notifications: undefined;
  addUserAddress: undefined;
  privacy: undefined;
  help: undefined;
  about: undefined;
  secondaryRoutes: undefined;
  authRoutes: undefined;
};

export type AppNavigatorRoutesProps =
  NativeStackNavigationProp<AppSecondaryRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AppSecondaryRoutes>();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="secondaryRoutes"
    >
      <Screen
        name="productDetails"
        component={ProductDetails}
        getId={({ params }) => params.id}
      />

      <Screen
        name="productReviews"
        component={ProductReviews}
        getId={({ params }) => params.itemId}
      />

      <Screen name="calendar" component={Calendar} />

      <Screen name="searchCategory" component={SearchCategory} />

      <Screen
        name="searchResults"
        component={SearchResults}
        getId={({ params }) => params.searchTerm}
      />

      <Screen name="leasing" component={Leasing} />

      <Screen name="dashboard" component={Dashboard} />

      <Screen name="userProducts" component={UserProducts} />
      <Screen
        name="editProduct"
        component={EditProduct}
        getId={({ params }) => params.id}
      />

      <Screen name="addProductStep1" component={AddProductStep1} />

      <Screen name="addProductStep2" component={AddProductStep2} />

      <Screen name="allOrders" component={AllOrders} />

      <Screen
        name="orderDetails"
        component={OrderDetails}
        getId={({ params }) => params.id}
      />

      <Screen
        name="rentalHistory"
        component={RentalHistory}
        getId={({ params }) => params.id}
      />

      <Screen name="account" component={Account} />

      <Screen name="addAddress" component={Address} />

      <Screen name="notifications" component={Notifications} />

      <Screen name="addUserAddress" component={AddAddress} />

      <Screen name="privacy" component={Privacy} />

      <Screen name="help" component={Help} />

      <Screen name="about" component={About} />

      <Screen name="secondaryRoutes" component={AppSecondaryRoutes} />

      <Screen name="authRoutes" component={UseAuthRoutes().AuthRoutes} />
    </Navigator>
  );
}
