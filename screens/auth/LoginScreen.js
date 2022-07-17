import { StyleSheet, Image, Text, View, StatusBar, KeyboardAvoidingView, ScrollView } from "react-native";
import React, { useState } from "react";
import { colors } from "../../constants";
import CustomInput from "../../components/CustomInput";
import header_logo from "../../assets/logo/logo.png";
import CustomButton from "../../components/CustomButton";
import CustomAlert from "../../components/CustomAlert/CustomAlert";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginHandle = () => {
    // if email does not contain @ sign
    if(!email.includes("@")){
      return setError("Email is not valid")
    }
    // length of email must be greater than 5 characters
    if(email.length < 6){
      return setError("Email is too short")
    }
    // length of password must be greater than 7 characters
    if(password.length < 8){
      return setError("Password must be 8 characters long")
    }
    setError("")
    alert("Logged in successfully!!");
  };

  // const keyboardVerticalOffset = Platform.OS === 'android' ? 40 : 0

  return (
    <KeyboardAvoidingView 
    // behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={styles.container}>
      <ScrollView>
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
      <View style={styles.screenNameContainer}>
        <Text style={styles.screenNameText}>Login</Text>
      </View>
      <View style={styles.formContainer}>
        <CustomAlert message={error} type={"error"} />
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
      <View style={styles.bottomContainer}>
        <Text>Don't have an account?</Text>
        <Text
          onPress={() => navigation.navigate("signup")}
          style={styles.signupText}
        >
          signup
        </Text>
      </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
    // padding:15
  },
  formContainer: {
    flex: 3,
    justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
    width: "100%",
    flexDirecion: "row",
    padding : 5
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
  bottomContainer: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
  },
  signupText: {
    marginLeft: 2,
    color: colors.primary,
    fontSize: 15,
    fontWeight: "600",
  },
  screenNameContainer: {
    marginTop: 10,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  screenNameText: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.muted,
  },
});
