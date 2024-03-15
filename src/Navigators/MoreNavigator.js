import {createStackNavigator} from '@react-navigation/stack';
import MoreOptionsScreen from '../components/moreOptions/MoreOptionsScreen';
import ProfileScreen from '../components/profile/ProfileScreen';
import UserNavigationScreen from '../components/profile/UserNavigationScreen';
import UserSettingScreen from '../components/profile/UserSettingScreen';
import MyProducts from '../components/profile/MyProducts';
import MyOrders from '../components/profile/OrderProducts';
import GraphScreen from '../components/profile/GraphScreen';

const Stack = createStackNavigator();

function MoreOptionsNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MoreOptions" component={ProfileScreen} />
      <Stack.Screen name="UserNavigation" component={UserNavigationScreen} />
      <Stack.Screen name="setting" component={UserSettingScreen} />
      <Stack.Screen name="MyProducts" component={MyProducts} />
      <Stack.Screen name="MyOrders" component={MyOrders} />
      <Stack.Screen name="Graph" component={GraphScreen} />
    </Stack.Navigator>
  );
}
export default MoreOptionsNavigator;
