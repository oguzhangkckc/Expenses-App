import {
  StyleSheet,
  Dimensions,
  Pressable,
  Text,
  View,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { AsyncStorage } from "react-native";

import FormSubmitBtn from "../components/FormSubmitBtn";

export default function SignUpScreen({ navigation }) {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const createUser = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match");
    } else {
      try {
        const response = await fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullname: fullname,
            email: email,
            password: password,
          }),
        });
        const data = await response.json();
        if (response.ok) {
          setError(null);
          await AsyncStorage.setItem("token", JSON.stringify(data));
          navigation.navigate("Main");
        }

        if (!response.ok) {
          setError(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome</Text>
      <View style={styles.login}>
        <View style={styles.inputView}>
          <Text style={styles.textInput}>Sign Up</Text>
          <View>
            <Text style={styles.headText}>Fullname</Text>
            <TextInput
              value={fullname}
              style={styles.signupInput}
              autoCapitalize ="none" 
              onChangeText={setFullname}
              placeholderTextColor="white"
              placeholder="Fullname"
            />
            <Text style={styles.headText}>Email</Text>
            <TextInput
              value={email}
              style={styles.signupInput}
              autoCapitalize ="none" 
              onChangeText={setEmail}
              placeholderTextColor="white"
              keyboardType="email-address"
              placeholder="Example@email.com"
            />
            <Text style={styles.headText}>Password</Text>
            <TextInput
              value={password}
              style={styles.signupInput}
              autoCapitalize ="none" 
              onChangeText={setPassword}
              placeholderTextColor="white"
              secureTextEntry={true}
              placeholder="********"
            />
            <Text style={styles.headText}>Confirm Password</Text>
            <TextInput
              value={confirmPassword}
              style={styles.signupInput}
              autoCapitalize ="none" 
              onChangeText={setConfirmPassword}
              placeholderTextColor="white"
              secureTextEntry={true}
              placeholder="********"
            />
          </View>
          <FormSubmitBtn title="SignUp" onPress={createUser} />
          <Pressable
            style={{ marginTop: 20 }}
            onPress={() => navigation.navigate("LogIn")}
          >
            <Text>Do you have an account? Login!</Text>
          </Pressable>
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