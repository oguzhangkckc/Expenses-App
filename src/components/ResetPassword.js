import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";

const ResetPassword = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigation = useNavigation();

  const resetPassword = async () => {
    setLoading(true);
    setError(null);

    const response = await fetch("http://localhost:3000/user/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        {
          email,
          password,
          confirmPassword,
        },
      ),
    });
    const json = await response.json();
    console.log(json);
    if (!response.ok) {
      setLoading(false);
      setError(json.message);
      if (!email || !password) {
        setError("Please fill all fields");
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match");
      }
    }
    if (response.ok) {
      setError(null);
      await AsyncStorage.setItem("user", JSON.stringify(json));
      setLoading(false);
      setEmail(json.email);
      setPassword(json.password);
      navigation.navigate("Login");
    }
  };
  return {
    resetPassword,
    error,
    loading,
    email,
    password,
    confirmPassword,
    setEmail,
    setPassword,
    setConfirmPassword,
  };
};

export default ResetPassword;
