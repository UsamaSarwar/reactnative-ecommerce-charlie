import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  StatusBar,
  Text,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import cartIcon from "../../assets/icons/cart_beg_active.png";
import { colors, network } from "../../constants";
import CartProductList from "../../components/CartProductList/CartProductList";
import CustomButton from "../../components/CustomButton";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import * as actionCreaters from "../../states/actionCreaters/actionCreaters";
import { bindActionCreators } from "redux";

const CartScreen = ({ navigation }) => {
  const cartproduct = useSelector((state) => state.product);
  const [totalPrice, setTotalPrice] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();

  const { removeCartItem, increaseCartItemQuantity, decreaseCartItemQuantity } =
    bindActionCreators(actionCreaters, dispatch);

  //method to remove the item from (cart) redux
  const deleteItem = (id) => {
    removeCartItem(id);
  };

  //method to increase the quantity of the item in(cart) redux
  const increaseQuantity = (id, quantity, avaiableQuantity) => {
    if (avaiableQuantity > quantity) {
      increaseCartItemQuantity({ id: id, type: "increase" });
      setRefresh(!refresh);
    }
  };

  //method to decrease the quantity of the item in(cart) redux
  const decreaseQuantity = (id, quantity) => {
    if (quantity > 1) {
      decreaseCartItemQuantity({ id: id, type: "decrease" });
      setRefresh(!refresh);
    }
  };

  //calcute and the set the total price whenever the value of carproduct change
  useEffect(() => {
    setTotalPrice(
      cartproduct.reduce((accumulator, object) => {
        return accumulator + object.price * object.quantity;
      }, 0)
    );
  }, [cartproduct, refresh]);

  return (
    <View style={styles.container}>
      <StatusBar></StatusBar>
      <View style={styles.topBarContainer}>
        <View style={styles.cartInfoContainerTopBar}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons
              name="arrow-back-circle-outline"
              size={30}
              color={colors.muted}
            />
          </TouchableOpacity>
          <View style={styles.cartInfoTopBar}>
            <Text>Your Cart</Text>
            <Text>{cartproduct.length} Items</Text>
          </View>
        </View>

        <View></View>
        <TouchableOpacity>
          <Image source={cartIcon} />
        </TouchableOpacity>
      </View>
      {cartproduct.length === 0 ? (
        <View style={styles.cartProductListContiainerEmpty}>
          {/* <Image
            source={CartEmpty}
            style={{ height: 400, resizeMode: "contain" }}
          /> */}
          <Text style={styles.secondaryTextSmItalic}>"Cart is empty"</Text>
        </View>
      ) : (
        <ScrollView style={styles.cartProductListContiainer}>
          {cartproduct.map((item, index) => (
            <CartProductList
              key={index}
              index={index}
              image={`${network.serverip}/uploads/${item.image}`}
              title={item.title}
              price={item.price}
              quantity={item.quantity}
              onPressIncrement={() => {
                increaseQuantity(
                  item._id,
                  item.quantity,
                  item.avaiableQuantity
                );
              }}
              onPressDecrement={() => {
                decreaseQuantity(item._id, item.quantity);
              }}
              handleDelete={() => {
                deleteItem(item._id);
              }}
            />
          ))}
          <View style={styles.emptyView}></View>
        </ScrollView>
      )}
      <View style={styles.cartBottomContainer}>
        <View style={styles.cartBottomLeftContainer}>
          <View style={styles.IconContainer}>
            <MaterialIcons
              name="featured-play-list"
              size={24}
              color={colors.primary}
            />
          </View>
          <View>
            <Text style={styles.cartBottomPrimaryText}>Total</Text>
            <Text style={styles.cartBottomSecondaryText}>{totalPrice}$</Text>
          </View>
        </View>
        <View style={styles.cartBottomRightContainer}>
          {cartproduct.length > 0 ? (
            <CustomButton
              text={"Checkout"}
              onPress={() => navigation.navigate("checkout")}
            />
          ) : (
            <CustomButton
              text={"Checkout"}
              disabled={true}
              onPress={() => navigation.navigate("checkout")}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default CartScreen;

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
  cartProductListContiainer: { width: "100%", padding: 20 },
  cartProductListContiainerEmpty: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  secondaryTextSmItalic: {
    fontStyle: "italic",
    fontSize: 15,
    color: colors.muted,
  },
  cartBottomContainer: {
    width: "100%",
    height: 120,
    display: "flex",
    backgroundColor: colors.white,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    elevation: 3,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  cartBottomLeftContainer: {
    padding: 20,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    alignItems: "center",
    width: "30%",
    height: "100%",
  },
  cartBottomRightContainer: {
    padding: 30,
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "column",
    alignItems: "center",
    width: "70%",
    height: "100%",
  },
  cartBottomPrimaryText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  cartBottomSecondaryText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  emptyView: {
    width: "100%",
    height: 20,
  },
  IconContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.light,
    height: 40,
    width: 40,
    borderRadius: 5,
  },
  cartInfoContainerTopBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  cartInfoTopBar: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: 5,
  },
});
