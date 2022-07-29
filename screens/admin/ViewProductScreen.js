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
import ProductList from "../../components/ProductList/ProductList";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import ProgressDialog from "react-native-progress-dialog";

var myHeaders = new Headers();
myHeaders.append(
  "x-auth-token",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmQ5MGUzNDI4OTI1YjYxNjVmOTA2NTgiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTY1OTA0MzU2NywiZXhwIjoxNjU5MDc5NTY3fQ.V0ydzJM8MJqN23Tx5trQ_gDZh5wR9KhpKakrWImb8PA"
);

var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

var ProductListRequestOptions = {
  method: "GET",
  redirect: "follow",
};

const ViewProductScreen = ({ navigation }) => {
  const [isloading, setIsloading] = useState(false);
  const [label, setLabel] = useState("Wait Please...");
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);

  const handleDelete = (id) => {
    setIsloading(true);
    console.log(id);
    fetch(`${network.serverip}/delete-product?id=${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setError(result.message);
          console.log(result);
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
    setIsloading(true);
    fetch(`${network.serverip}/products`, ProductListRequestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          console.log(result.data);
          setProducts(result.data);
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
          <Text style={styles.screenNameText}>View Product</Text>
        </View>
        <View>
          <Text style={styles.screenNameParagraph}>View all products</Text>
        </View>
      </View>
      <CustomAlert message={error} type={"error"} />
      <ScrollView
        style={{ flex: 1, width: "100%" }}
        showsVerticalScrollIndicator={false}
      >
        {products &&
          products.map((product, index) => {
            return (
              <ProductList
                key={index}
                image={require("../../assets/image/shirt2.png")}
                title={product?.title}
                category={"Garments"}
                price={product?.price}
                qantity={product?.sku}
                onPressView={() => {
                  console.log("view is working " + product._id);
                }}
                onPressEdit={() => {
                  console.log("edit is working " + product._id);
                }}
                onPressDelete={() => {
                  handleDelete(product._id);
                }}
              />
            );
          })}
      </ScrollView>
    </View>
  );
};

export default ViewProductScreen;

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
    justifyContent: "flex-start",
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
