import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const ResetPassword = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigation = useNavigation();



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
