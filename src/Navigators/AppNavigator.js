/* eslint-disable react/react-in-jsx-scope */
import {createStackNavigator} from '@react-navigation/stack';
import CategoryListingScreen from '../components/Categories/CategoryListingScreen';
import HomeScreen from '../components/home/HomeScreen';
import ProductDetailsScreen from '../components/Product/ProduceDetailsScreen';
import CartScreen from '../components/Cart/CartScreen';
import CheckOutScreen from '../components/Checkout/CheckOutScreen';
import ChatViewScreen from '../components/Chat/ChatView';
import { NavigationContainer } from '@react-navigation/native';
import TabBarNavigator from './TabBarNavigator';
import UserNavigationScreen from '../components/profile/UserNavigationScreen';
import UserSettingScreen from '../components/profile/UserSettingScreen';
import MyProducts from '../components/profile/MyProducts';
import MyOrders from '../components/profile/OrderProducts';
import GraphScreen from '../components/profile/GraphScreen';
import GeneralSetting from '../components/GeneralSetting'
import SecuritySetting from '../components/SecuritySetting'
import PrivacySetting from '../components/PrivacySetting'
const Stack = createStackNavigator();

function AppNavigator() {
  return (
<NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="TabBarNavigator" component={TabBarNavigator} />
      <Stack.Screen
        name="CategoryListingScreen"
        component={CategoryListingScreen}
      />
      <Stack.Screen
        name="ProductDetailsScreen"
        component={ProductDetailsScreen}
      />
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen name="checkOut" component={CheckOutScreen} />
      <Stack.Screen name="ChatView" component={ChatViewScreen} />
      <Stack.Screen name="UserNavigation" component={UserNavigationScreen} />
      <Stack.Screen name="setting" component={UserSettingScreen} />
      <Stack.Screen name="MyProducts" component={MyProducts} />
      <Stack.Screen name="MyOrders" component={MyOrders} />
      <Stack.Screen name="Graph" component={GraphScreen} />
      <Stack.Screen name="GeneralSetting" component={GeneralSetting} />
      <Stack.Screen name="SecuritySetting" component={SecuritySetting} />
      <Stack.Screen name="PrivacySetting" component={PrivacySetting} />



    </Stack.Navigator>
    </NavigationContainer>
  );
}
export default AppNavigator;
