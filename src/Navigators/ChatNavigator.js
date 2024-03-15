import {createStackNavigator} from '@react-navigation/stack';
import ChatScreen from '../components/Chat/ChatScreen';
import ChatView from '../components/Chat/ChatView';

const Stack = createStackNavigator();

function ChatNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} >
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen
        name="ChatView"
        component={ChatView}
      />
    </Stack.Navigator>
  );
}
export default ChatNavigator;
