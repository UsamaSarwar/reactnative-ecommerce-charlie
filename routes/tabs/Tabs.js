import { StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../../screens/user/HomeScreen";
import { colors } from "../../constants";
import UserProfileScreen from "../../screens/profile/UserProfileScreen";
import HomeIconActive from "../../assets/icons/bar_home_icon_active.png";
import HomeIcon from "../../assets/icons/bar_home_icon.png";
import userIcon from "../../assets/icons/bar_profile_icon.png";
import userIconActive from "../../assets/icons/bar_profile_icon_active.png";

const Tab = createBottomTabNavigator();

const Tabs = ({ navigation, route }) => {
  const { user } = route.params;
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.primary,

        tabBarIcon: ({ focused }) => {
          let routename = route.name;
          if (routename == "home") {
            return (
              <TouchableOpacity disabled>
                {focused == true ? (
                  <Image
                    source={HomeIconActive}
                    style={StyleSheet.tabIconStyle}
                  />
                ) : (
                  <Image source={HomeIcon} style={StyleSheet.tabIconStyle} />
                )}
              </TouchableOpacity>
            );
          } else if (routename == "wishlist") {
            return (
              <TouchableOpacity disabled>
                {focused == true ? (
                  <Ionicons
                    name="heart-outline"
                    size={29}
                    color={colors.primary}
                  />
                ) : (
                  <Ionicons
                    name="heart-outline"
                    size={29}
                    color={colors.muted}
                  />
                )}
              </TouchableOpacity>
            );
          } else if (routename == "user") {
            return (
              <TouchableOpacity disabled>
                {focused == true ? (
                  <Image
                    source={userIconActive}
                    style={StyleSheet.tabIconStyle}
                  />
                ) : (
                  <Image source={userIcon} style={StyleSheet.tabIconStyle} />
                )}
              </TouchableOpacity>
            );
          }
        },
        tabBarStyle: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: colors.white,
        },
      })}
    >
      <Tab.Screen
        name="home"
        component={HomeScreen}
        initialParams={{ user: user }}
      />
      {
        // Wishlist is ready yet!
        /* <Tab.Screen
        name="wishlist"
        component={HomeScreen}
        initialParams={{ user: user }}
      /> */
      }
      <Tab.Screen
        name="user"
        component={UserProfileScreen}
        initialParams={{ user: user }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  tabIconStyle: {
    width: 10,
    height: 10,
  },
});
