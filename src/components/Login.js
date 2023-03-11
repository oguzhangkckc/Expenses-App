import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { UseAuthContext } from "../hooks/UseAuthContext";

const Login = () => {
  const { dispatch } = UseAuthContext();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const signIn = async (data) => {
    setLoading(true);
    setError(null);

    const response = await fetch("http://localhost:3000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    console.log(json);
    if (!response.ok) {
      setLoading(false);
      setError(json.message);
    }
    if (response.ok) {
      setError(null);
      await AsyncStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      setLoading(false);
      setEmail(json.email);
      setPassword(json.password);
      navigation.navigate("Main");
    }
  };
  return { signIn, error, loading, email, password, setEmail, setPassword };
};

export default Login;
