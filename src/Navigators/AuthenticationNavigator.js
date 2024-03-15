import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import EmailLogin from '../components/authentication/EmailLogin';
import EmailSignUp from '../components/authentication/EmailSignUp';
import LoginScreen from '../components/authentication/LoginScreen';
import OTPScreen from '../components/authentication/OTPScreen';

const Stack = createStackNavigator();

function AuthenticationNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="EmailSignUp" component={EmailSignUp} />
        <Stack.Screen name="EmailLogin" component={EmailLogin} />
        <Stack.Screen name="ForgotPass" component={OTPScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default AuthenticationNavigator;
