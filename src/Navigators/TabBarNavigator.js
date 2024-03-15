import {Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import ListButton from './ListButton';
import AppNavigator from './AppNavigator';
import MoreOptionsNavigator from './MoreNavigator';
import ChatNavigator from './ChatNavigator';
import NotificationScreen from '../components/notification/NotificationScreen';
import ProductListingNavigator from './ProductListingNavigator';
import HomeScreen from '../components/home/HomeScreen';
import ProfileScreen from '../components/profile/ProfileScreen';

const Tab = createBottomTabNavigator();

function TabBarNavigator() {
  return (
    // <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {height: 80},
          tabBarLabelStyle: {
            fontSize: 11,
            paddingBottom: 10,
          },
          tabBarActiveTintColor: '#2DC3A1',
          tabBarHideOnKeyboard: true,
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={({route}) => ({
            tabBarIcon: () => (
              <Image
                style={{width: 24, height: 24}}
                source={require('../../assets/tabBar/home0.png')}
              />
            ),
            tabBarStyle: (route => {
              const routeName = getFocusedRouteNameFromRoute(route) ?? '';
              console.log(routeName);
              if (
                routeName === 'ProductDetailsScreen' ||
                routeName === 'checkOut'
              ) {
                return {display: 'none'};
              }
              return {height: 80};
            })(route),
          })}
        />
        <Tab.Screen
          name="Messages"
          component={ChatNavigator}
          options={({route}) => ({
            tabBarIcon: () => (
              <Image
                style={{width: 24, height: 24}}
                source={require('../../assets/tabBar/message0.png')}
              />
            ),
            tabBarStyle: (route => {
              const routeName = getFocusedRouteNameFromRoute(route) ?? '';
              console.log(routeName);
              if (routeName === 'ChatView') {
                return {display: 'none'};
              }
              return {height: 80};
            })(route),
          })}
        />
        <Tab.Screen
          name="ok"
          component={ProductListingNavigator}
          options={({navigation}) => ({
            tabBarButton: () => (
              <ListButton onPress={() => navigation.navigate('ok')} />
            ),
            tabBarStyle: {display: 'none'},
          })}
        />
        <Tab.Screen
          name="Notifications"
          component={NotificationScreen}
          options={() => ({
            tabBarIcon: () => (
              <Image
                style={{width: 24, height: 24}}
                source={require('../../assets/tabBar/notification0.png')}
              />
            ),
          })}
        />
        <Tab.Screen
          name="More"
          component={ProfileScreen}
          options={() => ({
            tabBarIcon: () => (
              <Image
                style={{width: 24, height: 24}}
                source={require('../../assets/tabBar/more0.png')}
              />
            ),
          })}
        />
      </Tab.Navigator>
    // </NavigationContainer>
  );
}

export default TabBarNavigator;
