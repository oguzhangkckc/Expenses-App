import {
  View,
  StyleSheet,
  FlatList,
  Text,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useEffect } from "react";

import Expenses from "../services/expenses/Expenses";

export default function AllScreen({ navigation }) {
  const { getExp, deleteExp, error, loading, data, name, amount, description } = Expenses();

  useEffect(() => {
    getExp();
  }, []);

  submitHandler = (id) => {
    deleteExp(id);
    getExp();
  };

  function ListEmptyComponent() {
    return (
      <View>
        <Text style={{ fontWeight: "bold", fontSize: 20, marginTop: 100 }}>
          There is nothing to show!
        </Text>
      </View>
    );
  }
  function navigateToUpdate(item) {
    console.log(item);
    navigation.navigate("Update", item);
  }
  console.log("data", data);
  return (
    <View style={styles.container}>
      {error && <Text style={{ color: "red" }}>{error}</Text>}
      <FlatList
        showsVerticalScrollIndicator={false}
        data = {data}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={ListEmptyComponent}
        renderItem={({ item }) => (
          <View style={styles.list}>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.nameView}>
                <Text style={styles.nameText}>{item.name}</Text>
              </View>
              <View style={styles.updateView}>
                <TouchableOpacity onPress={() => navigateToUpdate(item._id)}>
                  <Ionicons name="create-outline" size={25} color="white" />
                </TouchableOpacity>
              </View>
              <View style={styles.deleteView}>
                <TouchableOpacity
                  disabled={loading}
                  onPress={() => submitHandler(item._id)}
                >
                    <Ionicons name="trash" size={25} color="white" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.descriptionView}>
              <Text style={styles.descriptionText}>{item.description}</Text>
            </View>
            <View style={styles.amountView}>
              <Text style={styles.amountText}>{item.amount} $</Text>
            </View>
          </View>
        )}
      />
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
  updateView: {
    position: "absolute",
    right: 290,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: 30,
    height: 30,
    backgroundColor: "#003b88",
    borderRadius: 10,
  },
  deleteView: {
    position: "absolute",
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: 30,
    height: 30,
    backgroundColor: "#003b88",
    borderRadius: 10,
  },
  list: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#003b88",
    width: 350,
    height: 200,
    borderRadius: 10,
    marginTop: 20,
    marginHorizontal: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 12,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 18,
  },
  nameView: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    width: 250,
    height: 50,
    backgroundColor: "#003b88",
    borderRadius: 10,
    padding: 10,
  },
  nameText: {
    color: "white",
    fontSize: 20,
    paddingRight: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  descriptionView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 350,
    height: 50,
    backgroundColor: "#003b88",
    borderRadius: 10,
    marginTop: 10,
    padding: 10,
  },
  descriptionText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  amountView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 350,
    height: 50,
    backgroundColor: "#003b88",
    borderRadius: 10,
    marginTop: 10,
    padding: 10,
  },
  amountText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
