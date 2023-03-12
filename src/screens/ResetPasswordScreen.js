import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";

import FormSubmitBtn from "../components/FormSubmitBtn";
import ResetPassword from "../components/user/ResetPassword";

export default function ResetPasswordScreen() {
  const {
    resetPassword,
    error,
    isLoading,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
  } = ResetPassword();


  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome Back</Text>
      <View style={styles.login}>
        <View style={styles.inputView}>
          <Text style={styles.textInput}>Reset Password</Text>
          <View style={{ marginBottom: 30 }}>
            <Text style={styles.headText}>Email</Text>
            <TextInput
              style={styles.loginInput}
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              placeholderTextColor="white"
              placeholder="Example@email.com"
            />
            <Text style={styles.headText}>Password</Text>
            <TextInput
              style={styles.loginInput}
              autoCapitalize="none"
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="white"
              placeholder="Example@email.com"
            />
            <Text style={styles.headText}>Confirm Password</Text>
            <TextInput
              style={styles.loginInput}
              autoCapitalize="none"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholderTextColor="white"
              placeholder="Example@email.com"
            />
            <TouchableOpacity
              disabled={isLoading}
              onPress={() =>
                resetPassword({ email, password, confirmPassword })
              }
            >
              <FormSubmitBtn title="Submit" />
            </TouchableOpacity>
          </View>
          {error && <Text style={{ color: "red" }}>{error}</Text>}
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cfeffd",
    paddingTop: 100,
    alignItems: "center",
  },
  login: {
    backgroundColor: "#1aacf0",
    width: 300,
    height: 500,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    paddingHorizontal: 50,
  },
  inputView: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 100,
    paddingTop: 100,
    width: Dimensions.get("window").width,
  },
  textInput: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#003b88",
    paddingBottom: 70,
  },
  welcome: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#003b88",
    paddingBottom: 20,
    marginBottom: 20,
  },
  headText: {
    fontWeight: "bold",
    color: "white",
  },
  loginInput: {
    borderWidth: 1,
    borderColor: "#003b88",
    width: 200,
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});
