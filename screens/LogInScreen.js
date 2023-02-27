import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  Pressable,
  TextInput,
} from "react-native";
import React, { useState } from "react";

import Login from "../components/Login";
import FormSubmitBtn from "../components/FormSubmitBtn";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function LogInScreen({ navigation }) {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {signIn, error, isLoading} = Login();


  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome Back</Text>
      <View style={styles.login}>
        <View style={styles.inputView}>
          <Text style={styles.textInput}>Login</Text>
          <View style={{ marginBottom: 30 }}>
            <Text style={styles.headText}>Email</Text>
            <TextInput
              style={styles.loginInput}
              value={email}
              autoCapitalize="none"
              onChangeText={setEmail}
              placeholderTextColor="white"
              placeholder="Example@email.com"
            />
            <Text style={styles.headText}>Password</Text>
            <TextInput
              style={styles.loginInput}
              value={password}
              autoCapitalize="none"
              onChangeText={setPassword}
              placeholderTextColor="white"
              secureTextEntry={true}
              placeholder="********"
            />
          </View>
          <TouchableOpacity disabled={isLoading} onPress={() => signIn({email, password})}>
          <FormSubmitBtn title="Login" onPress={() => navigation.navigate("Main")}/>
          </TouchableOpacity>
          <Pressable
            style={{ marginTop: 20 }}
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text>Create an account!</Text>
          </Pressable>
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
    paddingTop: 180,
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
