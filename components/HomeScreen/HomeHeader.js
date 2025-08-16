import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants";
import cartIcon from "../../assets/icons/cart_beg.png";
import easybuylogo from "../../assets/logo/logo.png";

const HomeHeader = ({ navigation, cartproduct }) => {
  return (
    <View style={styles.topBarContainer}>
      <TouchableOpacity disabled>
        <Ionicons name="menu" size={30} color={colors.muted} />
      </TouchableOpacity>
      <View style={styles.topbarlogoContainer}>
        <Image source={easybuylogo} style={styles.logo} />
        <Text style={styles.toBarText}>EasyBuy</Text>
      </View>
      <TouchableOpacity
        style={styles.cartIconContainer}
        onPress={() => navigation.navigate("cart")}
      >
        {cartproduct.length > 0 ? (
          <View style={styles.cartItemCountContainer}>
            <Text style={styles.cartItemCountText}>{cartproduct.length}</Text>
          </View>
        ) : (
          <></>
        )}
        <Image source={cartIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
  topbarlogoContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 20,
  },
  logo: {
    height: 30,
    width: 30,
    resizeMode: "contain",
  },
  cartIconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cartItemCountContainer: {
    position: "absolute",
    zIndex: 10,
    top: -10,
    left: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 22,
    width: 22,
    backgroundColor: colors.danger,
    borderRadius: 11,
  },
  cartItemCountText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 10,
  },
});

export default HomeHeader;
