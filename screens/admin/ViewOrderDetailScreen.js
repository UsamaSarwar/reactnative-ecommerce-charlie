import {
  StyleSheet,
  Text,
  StatusBar,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { colors, network } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import ProgressDialog from "react-native-progress-dialog";
import BasicProductList from "../../components/BasicProductList/BasicProductList";
import CustomButton from "../../components/CustomButton";

const ViewOrderDetailScreen = ({ navigation }) => {
  const [isloading, setIsloading] = useState(false);
  const [label, setLabel] = useState("Loading..");
  const [error, setError] = useState("");
  const [alertType, setAlertType] = useState("error");
  const [totalCost, setTotalCost] = useState(180);
  const [orderItems, setOrderItems] = useState([
    {
      quantity: 1,
      price: 100,
      productId: "product1",
    },
    {
      quantity: 2,
      price: 150,
      productId: "product2",
    },
    {
      quantity: 3,
      price: 100,
      productId: "product3",
    },
    {
      quantity: 3,
      price: 20,
      productId: "product4",
    },
  ]);
  useEffect(() => {
    setTotalCost(
      orderItems.reduce((accumulator, object) => {
        return (accumulator + object.price) * object.quantity;
      }, 0)
    );
  }, []);
  return (
    <View style={styles.container}>
      <ProgressDialog visible={isloading} label={label} />
      <StatusBar></StatusBar>
      <View style={styles.TopBarContainer}>
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
      </View>
      <View style={styles.screenNameContainer}>
        <View>
          <Text style={styles.screenNameText}>Order Detials</Text>
        </View>
        <View>
          <Text style={styles.screenNameParagraph}>
            View all detail about order
          </Text>
        </View>
      </View>
      <CustomAlert message={error} type={alertType} />
      <ScrollView
        style={{ flex: 1, width: "100%", padding: 5 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.containerNameContainer}>
          <View>
            <Text style={styles.containerNameText}>Ship & Bill to</Text>
          </View>
        </View>
        <View style={styles.ShipingInfoContainer}>
          <Text style={styles.secondarytextMedian}>Bukhtyar Haider</Text>
          <Text style={styles.secondarytextMedian}>
            bukhtyar.haider1@gmail.com
          </Text>
          <Text style={styles.secondarytextSm}>
            punjab, Jhang, Satellite town , House no.363, street no.1, lalazar
            coloney phase no.1
          </Text>
        </View>
        <View>
          <Text style={styles.containerNameText}>Order Info</Text>
        </View>
        <View style={styles.orderInfoContainer}>
          <Text style={styles.secondarytextMedian}>
            Order # {"3ui4yiwu2ih3"}
          </Text>
          <Text style={styles.secondarytextSm}>
            Order on : {"02, Aug, 2019"}
          </Text>
        </View>
        <View style={styles.containerNameContainer}>
          <View>
            <Text style={styles.containerNameText}>Package Details</Text>
          </View>
        </View>
        <View style={styles.orderItemsContainer}>
          <View style={styles.orderItemContainer}>
            <Text style={styles.orderItemText}>Package</Text>
            <Text>Delivered</Text>
          </View>
          <View style={styles.orderItemContainer}>
            <Text style={styles.orderItemText}>
              Order on : {"02, Aug, 2019"}
            </Text>
          </View>
          <ScrollView
            style={styles.orderSummaryContainer}
            nestedScrollEnabled={true}
          >
            {orderItems.map((product, index) => (
              <View key={index}>
                <BasicProductList
                  title={product?.productId}
                  price={product?.price}
                  quantity={product?.quantity}
                />
              </View>
            ))}
          </ScrollView>
          <View style={styles.orderItemContainer}>
            <Text style={styles.orderItemText}>Total</Text>
            <Text>{totalCost}$</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <View>
          <Text>Status: Delivered</Text>
        </View>
        <View>
          <CustomButton text={"Update"} />
        </View>
      </View>
    </View>
  );
};

export default ViewOrderDetailScreen;

const styles = StyleSheet.create({
  container: {
    flexDirecion: "row",
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    paddingBottom: 0,
    flex: 1,
  },
  TopBarContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  screenNameContainer: {
    marginTop: 10,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  screenNameText: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.muted,
  },
  screenNameParagraph: {
    marginTop: 5,
    fontSize: 15,
  },
  ShipingInfoContainer: {
    marginTop: 5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 10,
    borderColor: colors.muted,
    elevation: 5,
    marginBottom: 10,
  },
  containerNameContainer: {
    marginTop: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  containerNameText: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.muted,
  },
  secondarytextSm: {
    color: colors.muted,
    fontSize: 13,
  },
  orderItemsContainer: {
    marginTop: 5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 10,

    borderColor: colors.muted,
    elevation: 3,
    marginBottom: 10,
  },
  orderItemContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderItemText: {
    fontSize: 13,
    color: colors.muted,
  },
  orderSummaryContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 10,
    maxHeight: 220,
    width: "100%",
    marginBottom: 5,
  },
  bottomContainer: {
    backgroundColor: colors.white,
    width: "100%",
    height: 70,
    borderTopLeftRadius: 10,
    borderTopEndRadius: 10,
    elevation: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    position: "absolute",
    zIndex: 2,
  },
  orderInfoContainer: {
    marginTop: 5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 10,

    borderColor: colors.muted,
    elevation: 1,
    marginBottom: 10,
  },
  primarytextMedian: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: "bold",
  },
  secondarytextMedian: {
    color: colors.muted,
    fontSize: 15,
    fontWeight: "bold",
  },
});
