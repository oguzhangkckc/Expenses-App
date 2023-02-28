import { useState } from "react";

import { UseAuthContext } from "../hooks/UseAuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddExp = (data) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const { dispatch } = UseAuthContext();

  const { user } = UseAuthContext();
  
  const add = async (data) => {
    setLoading(true);
    setError(null);
    

    const response = await fetch("http://localhost:3000/add-expense", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`,
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    if (!response.ok) {
      setLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      await AsyncStorage.setItem("user", JSON.stringify(json));
      setError(null);
      dispatch({ type: "LOGIN", payload: json });
      setLoading(false);
    }
  };
  return { add, error, loading };
};

export default AddExp;
