import { useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { UseAuthContext } from "../hooks/UseAuthContext";

const UserProfile = () => {
  const { dispatch } = UseAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const getProfile = async (user) => {
    setLoading(true);
    setError(null);

    const response = await fetch(`http://localhost:3000/user/${user.id}`, {
      method: "GET",
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
      dispatch({ type: "GET_PROFILE", payload: json });
      await AsyncStorage.setItem("user", JSON.stringify(json));
      setError(null);
      setLoading(false);
      setFullname(json.fullname);
      setEmail(json.email);
      setPassword(json.password);
    }
  };

  return { getProfile, loading, error, fullname, email, password };
};

export default UserProfile;
