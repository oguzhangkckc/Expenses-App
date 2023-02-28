import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import FormSubmitBtn from "../components/FormSubmitBtn";
import AddExp from "../components/AddExp";

export default function AddScreen() {
  const [name, setName] = useState(null);
  const [amount, setAmount] = useState(null);
  const [description, setDescription] = useState(null);
  const { add, error, loading } = AddExp();

  console.log(name, amount, description);

  const navigation = useNavigation();

  const HandleSubmit = (name, amount, description) => {
    if (!name || !amount || !description) {
      alert("Please fill in all fields");
    } else {
      add({ name, amount, description });
      navigation.goBack();
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
          <TouchableOpacity
            onPress={() => HandleSubmit(name, amount, description)}
            disabled={loading}
          >
            <FormSubmitBtn title="Add New" />
          </TouchableOpacity>
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
