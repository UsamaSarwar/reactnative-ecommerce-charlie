import {
  StyleSheet,
  StatusBar,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import BasicProductList from "../../components/BasicProductList/BasicProductList";
import { colors } from "../../constants";
import CustomButton from "../../components/CustomButton";

const data = [
  {
    id: 1,
    title: "product1",
    price: 30,
  },
  {
    id: 2,
    title: "product2",
    price: 30,
  },
  {
    id: 3,
    title: "product3",
    price: 30,
  },
  {
    id: 4,
    title: "product4",
    price: 30,
  },
  {
    id: 5,
    title: "product5",
    price: 30,
  },
  {
    id: 6,
    title: "product6",
    price: 30,
  },
];

const CheckoutScreen = () => {
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [totalCost, setTotalCost] = useState(180);
  const [address, setAddress] = useState(
    "House No.363, Street No, Lalazar Coloney, Jhang"
  );

  return (
    <View style={styles.container}>
      <StatusBar></StatusBar>
      <View style={styles.topBarContainer}>
        <TouchableOpacity>
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
          {data.map((product, index) => (
            <BasicProductList
              key={index}
              title={product.title}
              price={product.price}
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
          <CustomButton text={"Submit Order"} />
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
    height: 220,
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
