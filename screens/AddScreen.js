import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import React, { useState } from "react";

import FormSubmitBtn from "../components/FormSubmitBtn";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function AddScreen({ navigation }) {
  const [name, setName] = useState(null);
  const [amount, setAmount] = useState(null);
  const [description, setDescription] = useState(null);
  const [error, setError] = useState(null);

  console.log(name, amount, description);

  const postRequest = async () => {
    try {
      const response = await fetch("http://localhost:3000/add-expense", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          amount: amount,
          description: description,
        }),
      });
      const data = await response.json();
      if(!name || !amount || !description){
        setError(data.message)
      }
      if(name && amount && description){
      console.log(data);
      navigation.navigate("Expenses");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <View>
          <View style={styles.input}>
            <Text style={styles.headText}>Name of Expense</Text>
            <TextInput
              style={styles.textInput}
              placeholderTextColor="white"
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
            <Text style={styles.headText}>Amount</Text>
            <TextInput
              style={styles.textInput}
              placeholderTextColor="white"
              keyboardType="decimal-pad"
              placeholder="$$"
              value={amount}
              onChangeText={setAmount}
            />
            <Text style={styles.headText}>Description</Text>
            <TextInput
              style={styles.textInput}
              placeholderTextColor="white"
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
            />
          </View>
        </View>
        <View style={styles.button}>
          <FormSubmitBtn title="Add New" onPress={postRequest} />
          {error && <Text style={{ color: "red" }}>{error}</Text>}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1aacf0",
  },
  inputView: {
    width: "80%",
    backgroundColor: "#0570c9",
    borderRadius: 25,
    height: "50%",
    marginBottom: 20,
    padding: 20,
  },
  input: {
    marginLeft: 50,
  },
  button: {
    alignItems: "center",
    paddingBottom: 20,
  },
  pressed: {
    opacity: 0.5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#003b88",
    width: 200,
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  headText: {
    fontWeight: "bold",
    color: "white",
  },
});
