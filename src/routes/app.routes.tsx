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
import { AppSecondaryRoutes } from "./app.secondary.routes";
import { Account } from "@screens/Account";
import { Address } from "@screens/Address";
import { Notifications } from "@screens/Notifications";
import { AddAddress } from "@screens/AddAddress";

export type AppSecondaryRoutes = {
  productDetails: { id: string };
  productReviews: undefined;
  searchCategory: undefined;
  searchResults: undefined;
  leasing: undefined;
  dashboard: undefined;
  userProducts: undefined;
  editProduct: undefined;
  addProductStep1: undefined;
  addProductStep2: undefined;
  allOrders: undefined;
  orderDetails: { id: string };
  secondaryRoutes: undefined;
  account: undefined;
  addAddress: undefined;
  notifications: undefined;
  addUserAddress: undefined;
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
      <Screen name="productDetails" component={ProductDetails} getId={
        ({ params }) => params.id
      } />

      <Screen name="productReviews" component={ProductReviews} />

      <Screen name="searchCategory" component={SearchCategory} />

      <Screen name="searchResults" component={SearchResults} />

      <Screen name="leasing" component={Leasing} />

      <Screen name="dashboard" component={Dashboard} />

      <Screen name="userProducts" component={UserProducts} />

      <Screen name="editProduct" component={EditProduct} />

      <Screen name="addProductStep1" component={AddProductStep1} />

      <Screen name="addProductStep2" component={AddProductStep2} />

      <Screen name="allOrders" component={AllOrders} />

      <Screen name="orderDetails" component={OrderDetails} getId={
        ({ params }) => params.id
      } />
      <Screen name="secondaryRoutes" component={AppSecondaryRoutes} />

      <Screen name="account" component={Account} />

      <Screen name="addAddress" component={Address} />

      <Screen name="notifications" component={Notifications} />
      <Screen name="addUserAddress" component={AddAddress} />

    </Navigator>
  );
}
