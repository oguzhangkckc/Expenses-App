import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { UseAuthContext } from "../../hooks/UseAuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";


const ResetPassword = () => {
  const {dispatch} = UseAuthContext();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigation = useNavigation();

  const handleResetPassword = async () => {
    setLoading(true);
    setError(null);

    const response = await fetch('http://localhost:3000/user/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        confirmPassword,
      }),
    })
    const json = await response.json();
    console.log(json);
    if (!response.ok) {
      setLoading(false);
      setError(json.message);
      if (password !== confirmPassword) {
        setError("Password does not match");
      }
      if (confirmPassword === "") {
        setError("Confirm Password is required");
      }
      if (password === "") {
        setError("Password is required");
      }
      if (email === "") {
        setError("Email is required");
      }
    }
    if (response.ok) {
      dispatch({type: 'LOGIN', payload: json});
      await AsyncStorage.setItem('user', JSON.stringify(json));
      setError(null);
      setLoading(false);
      setEmail(json.email);
      setPassword(json.password);
      navigation.goBack();
    }
  };


  return {
    handleResetPassword,
    error,
    loading,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
  };
};

export default ResetPassword;
