import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/auth/LoginScreen";
import SignupScreen from "../screens/auth/SignupScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "../screens/auth/Splash";
import ForgetPasswordScreen from "../screens/auth/ForgetPasswordScreen";
import UpdatePasswordScreen from "../screens/auth/UpdatePasswordScreen";
import UserProfileScreen from "../screens/profile/UserProfileScreen";
import MyAccountScreen from "../screens/profile/MyAccountScreen";
import AddProductScreen from "../screens/admin/AddProductScreen";
import DashboardScreen from "../screens/admin/DashboardScreen";

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="dashboard"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="splash" component={Splash} />
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="signup" component={SignupScreen} />
        <Stack.Screen name="forgetpassword" component={ForgetPasswordScreen} />
        <Stack.Screen name="updatepassword" component={UpdatePasswordScreen} />
        <Stack.Screen name="userprofile" component={UserProfileScreen} />
        <Stack.Screen name="myaccount" component={MyAccountScreen} />
        <Stack.Screen name="addproduct" component={AddProductScreen} />
        <Stack.Screen name="dashboard" component={DashboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
