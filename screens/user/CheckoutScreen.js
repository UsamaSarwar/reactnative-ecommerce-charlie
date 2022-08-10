import {
  StyleSheet,
  StatusBar,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import BasicProductList from "../../components/BasicProductList/BasicProductList";
import { colors, network } from "../../constants";
import CustomButton from "../../components/CustomButton";
import { useSelector, useDispatch } from "react-redux";
import * as actionCreaters from "../../states/actionCreaters/actionCreaters";
import { bindActionCreators } from "redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CheckoutScreen = ({ navigation, route }) => {
  const cartproduct = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const handleCheckout = () => {
    confirmCheckout();
  };

  const confirmCheckout = async () => {
    var myHeaders = new Headers();
    const value = await AsyncStorage.getItem("authUser");
    let user = JSON.parse(value);
    console.log("Checkout:", user.token);

    myHeaders.append("x-auth-token", user.token);
    myHeaders.append("Content-Type", "application/json");

    var payload = [];
    var amount = 0;
    cartproduct.forEach((product) => {
      let obj = {
        productId: product._id,
        price: product.price,
        quantity: product.quantity,
      };
      amount += parseInt(product.price) * parseInt(product.quantity);
      payload.push(obj);
    });

    var raw = JSON.stringify({
      items: payload,
      amount: amount,
      discount: 0,
      payment_type: "cod",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(network.serverip + "/checkout", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success == true) {
          navigation.navigate("orderconfirm");
        }
      })
      .catch((error) => console.log("error", error));
  };

  const [deliveryCost, setDeliveryCost] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [address, setAddress] = useState(
    "House No.363, Street No, Lalazar Coloney, Jhang"
  );

  useEffect(() => {
    setTotalCost(
      cartproduct.reduce((accumulator, object) => {
        return (accumulator + object.price) * object.quantity;
      }, 0)
    );
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar></StatusBar>
      <View style={styles.topBarContainer}>
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
        <View></View>
        <View></View>
      </View>
      <ScrollView style={styles.bodyContainer} nestedScrollEnabled={true}>
        <Text style={styles.primaryText}>Order Summary</Text>
        <ScrollView
          style={styles.orderSummaryContainer}
          nestedScrollEnabled={true}
        >
          {cartproduct.map((product, index) => (
            <BasicProductList
              key={index}
              title={product.title}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </ScrollView>
        <Text style={styles.primaryText}>Total</Text>
        <View style={styles.totalOrderInfoContainer}>
          <View style={styles.list}>
            <Text>Order</Text>
            <Text>{totalCost}$</Text>
          </View>
          <View style={styles.list}>
            <Text>Delivery</Text>
            <Text>{deliveryCost}$</Text>
          </View>
          <View style={styles.list}>
            <Text style={styles.primaryTextSm}>Total</Text>
            <Text style={styles.secondaryTextSm}>
              {totalCost + deliveryCost}$
            </Text>
          </View>
        </View>
        <Text style={styles.primaryText}>Contact</Text>
        <View style={styles.listContainer}>
          <View style={styles.list}>
            <Text style={styles.secondaryTextSm}>Email</Text>
            <Text style={styles.secondaryTextSm}>
              bukhtyar.haider1@gmail.com
            </Text>
          </View>
          <View style={styles.list}>
            <Text style={styles.secondaryTextSm}>Phone</Text>
            <Text style={styles.secondaryTextSm}>+92 3410988683</Text>
          </View>
        </View>
        <Text style={styles.primaryText}>Address</Text>
        <View style={styles.listContainer}>
          <View style={styles.list}>
            <Text style={styles.secondaryTextSm}>Address</Text>
            <View>
              <Text
                style={styles.secondaryTextSm}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {address.length < 25
                  ? `${address}`
                  : `${address.substring(0, 25)}...`}
              </Text>
            </View>
          </View>
        </View>
        <Text style={styles.primaryText}>Payment</Text>
        <View style={styles.listContainer}>
          <View style={styles.list}>
            <Text style={styles.secondaryTextSm}>Method</Text>
            <Text style={styles.primaryTextSm}>Cash On Delivery</Text>
          </View>
        </View>
        <View style={styles.buttomContainer}>
          <CustomButton
            text={"Submit Order"}
            // onPress={() => navigation.replace("orderconfirm")}
            onPress={handleCheckout}
          />
        </View>
        <View style={styles.emptyView}></View>
      </ScrollView>
    </View>
  );
};

export default CheckoutScreen;

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
  bodyContainer: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  orderSummaryContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 10,
    maxHeight: 220,
  },
  totalOrderInfoContainer: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: colors.white,
  },
  primaryText: {
    marginBottom: 5,
    marginTop: 5,
    fontSize: 20,
    fontWeight: "bold",
  },
  list: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    backgroundColor: colors.white,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: colors.light,
    padding: 10,
  },
  primaryTextSm: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.primary,
  },
  secondaryTextSm: {
    fontSize: 15,
    fontWeight: "bold",
  },
  listContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 10,
  },
  buttomContainer: {
    padding: 20,
  },
  emptyView: {
    width: "100%",
    height: 20,
  },
});
