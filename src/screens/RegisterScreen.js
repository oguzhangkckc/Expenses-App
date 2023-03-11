import {
  StyleSheet,
  Dimensions,
  Pressable,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import FormSubmitBtn from "../components/FormSubmitBtn";
import Register from "../components/user/Register";

export default function RegisterScreen() {
  const {
    signUp,
    error,
    isLoading,
    fullname,
    email,
    password,
    confirmPassword,
    setFullname,
    setEmail,
    setPassword,
    setConfirmPassword,
  } = Register();

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome</Text>
      <View style={styles.login}>
        <View style={styles.inputView}>
          <Text style={styles.textInput}>Register</Text>
          <View>
            <Text style={styles.headText}>Fullname</Text>
            <TextInput
              value={fullname}
              style={styles.signupInput}
              autoCapitalize="none"
              onChangeText={setFullname}
              placeholderTextColor="white"
              placeholder="Fullname"
            />
            <Text style={styles.headText}>Email</Text>
            <TextInput
              value={email}
              style={styles.signupInput}
              autoCapitalize="none"
              onChangeText={setEmail}
              placeholderTextColor="white"
              keyboardType="email-address"
              placeholder="Example@email.com"
            />
            <Text style={styles.headText}>Password</Text>
            <TextInput
              value={password}
              style={styles.signupInput}
              autoCapitalize="none"
              onChangeText={setPassword}
              placeholderTextColor="white"
              secureTextEntry={true}
              placeholder="********"
            />
            <Text style={styles.headText}>Confirm Password</Text>
            <TextInput
              value={confirmPassword}
              style={styles.signupInput}
              autoCapitalize="none"
              onChangeText={setConfirmPassword}
              placeholderTextColor="white"
              secureTextEntry={true}
              placeholder="********"
            />
          </View>
          <TouchableOpacity
            onPress={() => signUp({ fullname, email, password })}
            disabled={isLoading}
          >
            <FormSubmitBtn title="Register" />
          </TouchableOpacity>
          <View style={{ flexDirection: "row", marginTop:20 }}>
            <Text>Already have an account? </Text>
            <Pressable
              onPress={() => navigation.navigate("LogIn")}
            >
              <Text style={{ color: "white" }}>Log In!</Text>
            </Pressable>
          </View>
          {error && <Text style={{ color: "red" }}>{error}</Text>}
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#cfeffd",
    flex: 1,
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
  textInput: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#003b88",
    paddingBottom: 20,
    marginTop: 80,
  },
  inputView: {
    paddingBottom: 150,
    paddingTop: 50,
    width: Dimensions.get("window").width,
    alignItems: "center",
  },
  welcome: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#003b88",
    paddingBottom: 20,
    marginTop: 80,
  },
  signupInput: {
    borderWidth: 1,
    borderColor: "#003b88",
    width: 200,
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  headText: {
    fontWeight: "bold",
    color: "white",
  },
});
