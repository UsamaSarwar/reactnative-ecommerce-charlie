import { StyleSheet, Image, Text, View, StatusBar } from "react-native";
import React, { useState } from "react";
import { colors } from "../../constants";
import CustomInput from "../../components/CustomInput";
import header_logo from "../../assets/logo/logo.png";
import CustomButton from "../../components/CustomButton";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandle = () => {
    alert("login btn clicked");
  };

  return (
    <View style={styles.container}>
      <StatusBar></StatusBar>
      <View style={styles.welconeContainer}>
        <View>
          <Text style={styles.welcomeText}>Welcome to EasyBuy</Text>
          <Text style={styles.welcomeParagraph}>make your ecommerce easy</Text>
        </View>
        <View>
          <Image style={styles.logo} source={header_logo} />
        </View>
      </View>
      <View style={styles.formContainer}>
        <CustomInput
          value={email}
          setValue={setEmail}
          placeholder={"Username"}
          placeholderTextColor={colors.muted}
          radius={5}
        />
        <CustomInput
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
          placeholder={"Password"}
          placeholderTextColor={colors.muted}
          radius={5}
        />
        <View style={styles.forgetPasswordContainer}>
          <Text
            onPress={() => navigation.navigate("forgetpassowrd")}
            style={styles.ForgetText}
          >
            Forget Password ?
          </Text>
        </View>
      </View>
      <View style={styles.buttomContainer}>
        <CustomButton text={"Login"} onPress={loginHandle} />
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flexDirecion: "row",
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    flex: 1,
  },
  welconeContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: "30%",
  },
  formContainer: {
    flex: 3,
    justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
    width: "100%",
    flexDirecion: "row",
  },
  logo: {
    resizeMode: "contain",
    width: 80,
  },
  welcomeText: {
    fontSize: 42,
    fontWeight: "bold",
    color: colors.muted,
  },
  welcomeParagraph: {
    fontSize: 15,
    fontWeight: "500",
    color: colors.primary_shadow,
  },
  forgetPasswordContainer: {
    marginTop: 10,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  ForgetText: {
    fontSize: 15,
    fontWeight: "600",
  },
  buttomContainer: {
    width: "100%",
  },
});
