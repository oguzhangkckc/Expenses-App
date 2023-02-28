import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const Expenses = () => {
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

    const response = await fetch("http://localhost:3000/get-expense", {
      method: "GET",
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
      setError(null);
      setData(json);
      setLoading(false);
    }
  };

  const deleteExp = async (id) => {
    setLoading(true);
    setError(null);

    const response = await fetch(`http://localhost:3000/${id}`, {
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
        setError(null);
        setData(json);
        setLoading(false);
    }
    };

    const addExp = async (data) => {
        setLoading(true);
        setError(null);

        const response = await fetch("http://localhost:3000/add-expense", {
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
            setError(null);
            setData(json);
            setLoading(false);
            setName(json.name);
            setAmount(json.amount);
            setDescription(json.description);
            navigation.goBack();
        }
    };


  return { getExp, deleteExp, addExp, error, loading, data, setData, name, amount, description, setName, setAmount, setDescription};
};

export default Expenses;
