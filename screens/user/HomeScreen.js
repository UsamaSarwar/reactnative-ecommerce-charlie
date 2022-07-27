import {
  StyleSheet,
  StatusBar,
  View,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import cartIcon from "../../assets/icons/cart_beg.png";
const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar></StatusBar>
      <View style={styles.topBarContainer}>
        <TouchableOpacity>
          <Ionicons name="menu" size={30} color={colors.muted} />
        </TouchableOpacity>
        <View>
          <Text style={styles.toBarText}>Home</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("cart")}>
          <Image source={cartIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirecion: "row",
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingBottom: 0,
    flex: 1,
  },
  topBarContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  toBarText: {
    fontSize: 15,
    fontWeight: "600",
  },
});
