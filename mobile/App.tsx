import 'react-native-gesture-handler';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function App() {
  const isSignedIn: boolean = true;

  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
        {isSignedIn ? (
          <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
