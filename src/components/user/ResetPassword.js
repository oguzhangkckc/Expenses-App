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

  const confirmEmail = async (email) => { 
    setLoading(true);
    setError(null);

    const response = await fetch("http://localhost:3000/user/confirm-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response || !response.status) {
      setError("Network error");
      setLoading(false);
      return;
    }

    const json = await response.json();

    if (response.status !== 201) {
      setError(json.message);
      setLoading(false);
      return;
    }

    setError(null);
    setLoading(false);
    navigation.navigate("ResetPassword", { email });
  };
  

  return {
    
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
