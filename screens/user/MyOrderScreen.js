import {
  StyleSheet,
  Text,
  StatusBar,
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect } from "react";
import { colors, network } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import ProgressDialog from "react-native-progress-dialog";
import OrderList from "../../components/OrderList/OrderList";

const MyOrderScreen = ({ navigation, route }) => {
  const { user } = route.params;
  const [isloading, setIsloading] = useState(false);
  const [label, setLabel] = useState("Please wait...");
  const [refeshing, setRefreshing] = useState(false);
  const [alertType, setAlertType] = useState("error");
  const [error, setError] = useState("");
  const [orders, setOrders] = useState([]);
  const [UserInfo, setUserInfo] = useState({});

  const getToken = (obj) => {
    try {
    } catch (e) {
      console.log("converttoJSON:", e);
      return obj.token;
    }
    return JSON.parse(obj).token;
  };

  const handleOnRefresh = () => {
    setRefreshing(true);
    fetchOrders();
    setRefreshing(false);
  };

  const handleOrderDetail = (item) => {
    navigation.navigate("vieworderdetails", {
      orderDetail: item,
      Token: getToken(authUser),
    });
  };

  const fetchOrders = () => {
    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", getToken(user));

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    setIsloading(true);
    fetch(`${network.serverip}/orders`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setOrders(result.data);
          setError("");
        } else {
          setError(result.message);
        }
        setIsloading(false);
      })
      .catch((error) => {
        setIsloading(false);
        setError(error.message);
        console.log("error", error);
      });
  };

  useEffect(() => {
    console.log(user?.token);
    fetchOrders();
    console.log(orders);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar></StatusBar>
      <ProgressDialog visible={isloading} label={label} />
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
        <TouchableOpacity>
          <Ionicons name="cart-outline" size={30} color={colors.primary} />
        </TouchableOpacity>
      </View>
      <CustomAlert message={error} type={alertType} />
      <ScrollView
        style={{ flex: 1, width: "100%", padding: 20 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refeshing} onRefresh={handleOnRefresh} />
        }
      >
        {orders &&
          orders.map((order, index) => {
            return (
              <OrderList
                item={order}
                key={index}
                // onPress={() => handleOrderDetail(order)}
              />
            );
          })}
        <View style={styles.emptyView}></View>
      </ScrollView>
    </View>
  );
};

export default MyOrderScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirecion: "row",
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "flex-start",
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
    width: "100%",
    flexDirecion: "row",
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
  },
  emptyView: {
    height: 20,
  },
});
