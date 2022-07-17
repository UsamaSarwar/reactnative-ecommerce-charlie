import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/auth/LoginScreen";
import SignupScreen from "./screens/auth/SignupScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "./screens/auth/Splash";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="splash" component={Splash} />
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="signup" component={SignupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
