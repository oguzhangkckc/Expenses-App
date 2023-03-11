import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { UseAuthContext } from "../hooks/UseAuthContext";

const Expenses = () => {

  const { dispatch } = UseAuthContext();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const navigation = useNavigation();

  const getExp = async () => {
    setLoading(true);
    setError(null);

    const response = await fetch("http://localhost:3000/input/get-expense", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setLoading(false);
      setError(json.message);
    }
    if (response.ok) {
      dispatch({ type: "GET_EXPENSE", payload: json });
      setError(null);
      setData(json);
      setLoading(false);
    }
  };

  const deleteExp = async (id) => {
    setLoading(true);
    setError(null);

    const response = await fetch(`http://localhost:3000/input/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    console.log(json);
    if (!response.ok) {
      setLoading(false);
      setError(json.message);
    }
    if (response.ok) {
      dispatch({ type: "DELETE_EXPENSE", payload: json });
      setError(null);
      setData(json);
      setLoading(false);
    }
  };

  const addExp = async (data) => {
    setLoading(true);
    setError(null);

    const response = await fetch("http://localhost:3000/input/add-expense", {
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
      if (!name || !amount || !description) {
        setError("Please fill in all fields");
      }
    }
    if (response.ok) {
      dispatch({ type: "ADD_EXPENSE", payload: json });
      setError(null);
      setData(json);
      setLoading(false);
      setName(json.name);
      setAmount(json.amount);
      setDescription(json.description);
      navigation.goBack();
    }
  };

  const updateExp = async (data) => {
    setLoading(true);
    setError(null);

    const response = await fetch(`http://localhost:3000/input/update/${data.id}`, {
      method: "PUT",
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
      if (!name || !amount || !description) {
        setError("Please fill in all fields");
      }
    }
    if (response.ok) {
      dispatch({ type: "UPDATE_EXPENSE", payload: json });
      setError(null);
      setData(json);
      setLoading(false);
      setName(json.name);
      setAmount(json.amount);
      setDescription(json.description);
      navigation.goBack();
    }
  };

  return {
    getExp,
    deleteExp,
    addExp,
    updateExp,
    setData,
    setName,
    setAmount,
    setDescription,
    error,
    loading,
    data,
    name,
    amount,
    description,
  };
};

export default Expenses;
