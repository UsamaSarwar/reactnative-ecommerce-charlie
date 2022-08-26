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
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import ProgressDialog from "react-native-progress-dialog";
import OrderList from "../../components/OrderList/OrderList";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MyOrderScreen = ({ navigation, route }) => {
  const { user } = route.params;
  const [isloading, setIsloading] = useState(false);
  const [label, setLabel] = useState("Please wait...");
  const [refeshing, setRefreshing] = useState(false);
  const [alertType, setAlertType] = useState("error");
  const [error, setError] = useState("");
  const [orders, setOrders] = useState([]);
  const [UserInfo, setUserInfo] = useState({});

  //method to remove the authUser from aysnc storage and navigate to login
  const logout = async () => {
    await AsyncStorage.removeItem("authUser");
    navigation.replace("login");
  };

  //method to convert the authUser to json object
  const convertToJSON = (obj) => {
    try {
      setUserInfo(JSON.parse(obj));
    } catch (e) {
      setUserInfo(obj);
    }
  };

  //method to convert the authUser to json object and return token
  const getToken = (obj) => {
    try {
      setUserInfo(JSON.parse(obj));
    } catch (e) {
      setUserInfo(obj);
      return user.token;
    }
    return UserInfo.token;
  };

  //method call on pull refresh
  const handleOnRefresh = () => {
    setRefreshing(true);
    fetchOrders();
    setRefreshing(false);
  };

  //method to navigate to order detail screen of a specific order
  const handleOrderDetail = (item) => {
    navigation.navigate("myorderdetail", {
      orderDetail: item,
      Token: UserInfo.token,
    });
  };

  //fetch order from server using API call
  const fetchOrders = () => {
    var myHeaders = new Headers();
    let token = getToken(user);
    myHeaders.append("x-auth-token", token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    setIsloading(true);
    fetch(`${network.serverip}/orders`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result?.err === "jwt expired") {
          logout();
        }
        if (result.success) {
          setOrders(result.data);
          setError("");
        }
        setIsloading(false);
      })
      .catch((error) => {
        setIsloading(false);
        setError(error.message);
        console.log("error", error);
      });
  };

  //convert authUser to Json object and fetch orders on initial render
  useEffect(() => {
    convertToJSON(user);
    fetchOrders();
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
        <TouchableOpacity onPress={() => handleOnRefresh()}>
          <Ionicons name="cart-outline" size={30} color={colors.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.screenNameContainer}>
        <View>
          <Text style={styles.screenNameText}>My Orders</Text>
        </View>
        <View>
          <Text style={styles.screenNameParagraph}>
            Your order and your order status
          </Text>
        </View>
      </View>
      <CustomAlert message={error} type={alertType} />
      {orders.length == 0 ? (
        <View style={styles.ListContiainerEmpty}>
          <Text style={styles.secondaryTextSmItalic}>
            "There are no orders placed yet."
          </Text>
        </View>
      ) : (
        <ScrollView
          style={{ flex: 1, width: "100%", padding: 20 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refeshing}
              onRefresh={handleOnRefresh}
            />
          }
        >
          {orders.map((order, index) => {
            return (
              <OrderList
                item={order}
                key={index}
                onPress={() => handleOrderDetail(order)}
              />
            );
          })}
          <View style={styles.emptyView}></View>
        </ScrollView>
      )}
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
  screenNameContainer: {
    padding: 20,
    paddingTop: 0,
    paddingBottom: 0,
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
  ListContiainerEmpty: {
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
});
