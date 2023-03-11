import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { UseAuthContext } from "../hooks/UseAuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Register = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const { dispatch } = UseAuthContext();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigation = useNavigation();

  const signUp = async (data) => {
    setLoading(true);
    setError(null);

    const response = await fetch("http://localhost:3000/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();

    if (!response.ok) {
      setLoading(false);
      setError(json.error);
      if (!fullname || !email || !password || !confirmPassword) {
        setError("Please fill all fields");
      }
    }
    if (json.error === "User already exists") {
      navigation.navigate("Login");
      alert("User already exists");
    }
    if (response.ok) {
      await AsyncStorage.setItem("user", JSON.stringify(json));
      setError(null);
      dispatch({ type: "LOGIN", payload: json });
      setLoading(false);
      setFullname(json.fullname);
      setEmail(json.email);
      setPassword(json.password);
      navigation.navigate("Main");
    }
  };


  return {
    signUp,
    error,
    loading,
    fullname,
    email,
    password,
    setFullname,
    setEmail,
    setPassword,
    confirmPassword,
    setConfirmPassword,
  };
};

export default Register;
