import { View, StyleSheet, FlatList, Text, Pressable } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useState, useEffect } from "react";

export default function AllScreen() {
  const [data, setData] = useState(null);

  const getRequest = async () => {
    const response = await fetch("http://localhost:3000/get-expense", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setData(data);
  };

  const deleteRequest = async (id) => {
    const response = await fetch(`http://localhost:3000/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    setData(data);
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

  useEffect(() => {
    getRequest();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={ListEmptyComponent}
        renderItem={({ item }) => (
          <View style={styles.list}>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.nameView}>
                <Text style={styles.listname}>{item.name}</Text>
              </View>
              <View style={styles.butonView}>
                <Pressable onPress={() => deleteRequest(item._id)}>
                  <Ionicons name="trash" size={25} color="white" />
                </Pressable>
              </View>
            </View>
            <View style={styles.dateView}>
              <Text style={styles.listdate}>{item.description}</Text>
            </View>
            <View style={styles.amountView}>
              <Text style={styles.listamount}>{item.amount} $</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  butonView: {
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
  listname: {
    color: "white",
    fontSize: 20,
    paddingRight: 10,
    textAlign: "center",
    fontWeight: "bold",
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
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1aacf0",
  },
  list: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#003b88",
    width: 350,
    height: 200,
    borderRadius: 10,
    marginTop: 10,
    padding: 10,
  },
  listdate: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  listamount: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  dateView: {
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
});
