import { useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

const UserProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const getProfile = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:3000/user/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      console.log(json);
  
      if (!response.ok) {
        setError(json.message);
      }

      await AsyncStorage.setItem("user", JSON.stringify(json));
      setError(null);
      setLoading(false);
      setFullname(json.fullname);
      setEmail(json.email);
      
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError(error.message);
    }
  };
  

  return { getProfile, loading, error, fullname, email, password, setFullname, setEmail, setPassword };
};

export default UserProfile;
