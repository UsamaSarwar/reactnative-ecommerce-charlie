import {
  StyleSheet,
  StatusBar,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../constants";
import CustomCard from "../../components/CustomCard/CustomCard";
import OptionList from "../../components/OptionList/OptionList";
import InternetConnectionAlert from "react-native-internet-connection-alert";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProgressDialog from "react-native-progress-dialog";

const DashboardScreen = ({ navigation, route }) => {
  const { authUser } = route.params;
  const [user, setUser] = useState(authUser);
  const [label, setLabel] = useState("Loading...");
  const [error, setError] = useState("");
  const [isloading, setIsloading] = useState(false);
  const [data, setData] = useState([]);
  const [refeshing, setRefreshing] = useState(false);

  //method to remove the auth user from async storage and navigate the login if token expires
  const logout = async () => {
    await AsyncStorage.removeItem("authUser");
    navigation.replace("login");
  };

  var myHeaders = new Headers();
  myHeaders.append("x-auth-token", authUser.token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  //method the fetch the statistics from server using API call
  const fetchStats = () => {
    fetch(`${network.serverip}/dashboard`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success == true) {
          //set the fetched data to Data state
          setData([
            {
              id: 1,
              title: "Users",
              value: result.data?.usersCount,
              iconName: "person",
              type: "parimary",
              screenName: "viewusers",
            },
            {
              id: 2,
              title: "Orders",
              value: result.data?.ordersCount,
              iconName: "cart",
              type: "secondary",
              screenName: "vieworder",
            },
            {
              id: 3,
              title: "Products",
              value: result.data?.productsCount,
              iconName: "md-square",
              type: "warning",
              screenName: "viewproduct",
            },
            {
              id: 4,
              title: "Categories",
              value: result.data?.categoriesCount,
              iconName: "menu",
              type: "muted",
              screenName: "viewcategories",
            },
          ]);
          setError("");
          setIsloading(false);
        } else {
          console.log(result.err);
          if (result.err == "jwt expired") {
            logout();
          }
          setError(result.message);
          setIsloading(false);
        }
      })
      .catch((error) => {
        setError(error.message);
        console.log("error", error);
        setIsloading(false);
      });
  };

  //method call on Pull refresh
  const handleOnRefresh = () => {
    setRefreshing(true);
    fetchStats();
    setRefreshing(false);
  };

  //call the fetch function initial render
  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <InternetConnectionAlert onChange={(connectionState) => {}}>
      <View style={styles.container}>
        <StatusBar></StatusBar>
        <ProgressDialog visible={isloading} label={label} />
        <View style={styles.topBarContainer}>
          <TouchableOpacity
            onPress={async () => {
              await AsyncStorage.removeItem("authUser");
              navigation.replace("login");
            }}
          >
            <Ionicons name="log-out" size={30} color={colors.muted} />
          </TouchableOpacity>
          <View>
            <Text style={styles.toBarText}>Dashboard</Text>
          </View>
          <TouchableOpacity>
            <Ionicons
              name="person-circle-outline"
              size={30}
              color={colors.muted}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.headingContainer}>
          <MaterialCommunityIcons name="menu-right" size={30} color="black" />
          <Text style={styles.headingText}>Welcome, Admin</Text>
        </View>
        <View style={{ height: 370 }}>
          {data && (
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={refeshing}
                  onRefresh={handleOnRefresh}
                />
              }
              contentContainerStyle={styles.cardContainer}
            >
              {data.map((data) => (
                <CustomCard
                  key={data.id}
                  iconName={data.iconName}
                  title={data.title}
                  value={data.value}
                  type={data.type}
                  onPress={() => {
                    navigation.navigate(data.screenName, { authUser: user });
                  }}
                />
              ))}
            </ScrollView>
          )}
        </View>
        <View style={styles.headingContainer}>
          <MaterialCommunityIcons name="menu-right" size={30} color="black" />
          <Text style={styles.headingText}>Actions</Text>
        </View>
        <View style={{ flex: 1, width: "100%" }}>
          <ScrollView style={styles.actionContainer}>
            <OptionList
              text={"Products"}
              Icon={Ionicons}
              iconName={"md-square"}
              onPress={() =>
                navigation.navigate("viewproduct", { authUser: user })
              }
              onPressSecondary={() =>
                navigation.navigate("addproduct", { authUser: user })
              }
              type="morden"
            />
            <OptionList
              text={"Categories"}
              Icon={Ionicons}
              iconName={"menu"}
              onPress={() =>
                navigation.navigate("viewcategories", { authUser: user })
              }
              onPressSecondary={() =>
                navigation.navigate("addcategories", { authUser: user })
              }
              type="morden"
            />
            <OptionList
              text={"Orders"}
              Icon={Ionicons}
              iconName={"cart"}
              onPress={() =>
                navigation.navigate("vieworder", { authUser: user })
              }
              type="morden"
            />
            <OptionList
              text={"Users"}
              Icon={Ionicons}
              iconName={"person"}
              onPress={() =>
                navigation.navigate("viewusers", { authUser: user })
              }
              type="morden"
            />

            <View style={{ height: 20 }}></View>
          </ScrollView>
        </View>
      </View>
    </InternetConnectionAlert>
  );
};

export default DashboardScreen;

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
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "center",
    justifyContent: "center",
  },
  bodyContainer: {
    width: "100%",
  },
  headingContainer: {
    display: "flex",
    justifyContent: "flex-start",
    paddingLeft: 10,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
  },
  headingText: {
    fontSize: 20,
    color: colors.muted,
    fontWeight: "800",
  },
  actionContainer: { padding: 20, width: "100%", flex: 1 },
});
