import {
  StyleSheet,
  Text,
  StatusBar,
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { colors, network } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import CustomInput from "../../components/CustomInput/";
import ProgressDialog from "react-native-progress-dialog";
import CategoryList from "../../components/CategoryList";

const ViewCategoryScreen = ({ navigation, route }) => {
  const { authUser } = route.params;
  const [user, setUser] = useState({});

  const getToken = (obj) => {
    try {
      setUser(JSON.parse(obj));
    } catch (e) {
      setUser(obj);
      return obj.token;
    }
    return JSON.parse(obj).token;
  };

  const [isloading, setIsloading] = useState(false);
  const [refeshing, setRefreshing] = useState(false);
  const [alertType, setAlertType] = useState("error");

  const [label, setLabel] = useState("Loading...");
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [filterItem, setFilterItem] = useState("");

  //method call on Pull refresh
  const handleOnRefresh = () => {
    setRefreshing(true);
    fetchCategories();
    setRefreshing(false);
  };
  //method to navigate to edit screen for specific catgeory
  const handleEdit = (item) => {
    navigation.navigate("editcategories", {
      category: item,
      authUser: authUser,
    });
  };
  //method to delete the specific catgeory
  const handleDelete = (id) => {
    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", getToken(authUser));

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    setIsloading(true);
    fetch(`${network.serverip}/delete-category?id=${id}`, requestOptions) // API call
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          fetchCategories();
          setError(result.message);
          setAlertType("success");
        } else {
          setError(result.message);
          setAlertType("error");
        }
        setIsloading(false);
      })
      .catch((error) => {
        setIsloading(false);
        setError(error.message);
        console.log("error", error);
      });
  };

  // method for alert
  const showConfirmDialog = (id) => {
    return Alert.alert(
      "Are your sure?",
      "Are you sure you want to delete the category?",
      [
        {
          text: "Yes",
          onPress: () => {
            handleDelete(id);
          },
        },
        {
          text: "No",
        },
      ]
    );
  };

  //method the fetch the catgeories from server using API call
  const fetchCategories = () => {
    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", getToken(authUser));

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    setIsloading(true);
    fetch(`${network.serverip}/categories`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setCategories(result.categories);
          setFoundItems(result.categories);
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

  //method to filer the product for by title [search bar]
  const filter = () => {
    const keyword = filterItem;
    if (keyword !== "") {
      const results = categories?.filter((item) => {
        return item?.title.toLowerCase().includes(keyword.toLowerCase());
      });
      setFoundItems(results);
    } else {
      setFoundItems(categories);
    }
  };

  //filter the data whenever filteritem value change
  useEffect(() => {
    filter();
  }, [filterItem]);

  //fetch the categories on initial render
  useEffect(() => {
    fetchCategories();
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
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("addcategories", { authUser: authUser });
          }}
        >
          <AntDesign name="plussquare" size={30} color={colors.muted} />
        </TouchableOpacity>
      </View>
      <View style={styles.screenNameContainer}>
        <View>
          <Text style={styles.screenNameText}>View Categories</Text>
        </View>
        <View>
          <Text style={styles.screenNameParagraph}>View all Categories</Text>
        </View>
      </View>
      <CustomAlert message={error} type={alertType} />
      <CustomInput
        radius={5}
        placeholder={"Search..."}
        value={filterItem}
        setValue={setFilterItem}
      />
      <ScrollView
        style={{ flex: 1, width: "100%" }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refeshing} onRefresh={handleOnRefresh} />
        }
      >
        {foundItems && foundItems.length == 0 ? (
          <Text>{`No category found with the title of ${filterItem}!`}</Text>
        ) : (
          foundItems.map((item, index) => (
            <CategoryList
              icon={`${network.serverip}/uploads/${item?.icon}`}
              key={index}
              title={item?.title}
              description={item?.description}
              onPressEdit={() => {
                handleEdit(item);
              }}
              onPressDelete={() => {
                showConfirmDialog(item?._id);
              }}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default ViewCategoryScreen;

const styles = StyleSheet.create({
  container: {
    flexDirecion: "row",
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    flex: 1,
  },
  TopBarContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  formContainer: {
    flex: 2,
    justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
    width: "100%",
    flexDirecion: "row",
    padding: 5,
  },

  buttomContainer: {
    width: "100%",
  },
  bottomContainer: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  screenNameContainer: {
    marginTop: 10,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: 10,
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
});
