import { useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { UseAuthContext } from "../hooks/UseAuthContext";

const Login = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { dispatch } = UseAuthContext();


  const signIn = async (data) => {
    setLoading(true);
    setError(null);

    const response = await fetch("http://localhost:3000/login", {
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
      await AsyncStorage.setItem("token", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      setLoading(false);
    }
  };
  return { signIn, error, loading };
};

export default Login;
