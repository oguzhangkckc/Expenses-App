import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

import Expenses from "../services/expenses/Expenses";

export default function RecentScreen({ navigation }) {
  const { getExp, deleteExp, error, loading, data } = Expenses();

  useEffect(() => {
    getExp();
  }, [data]);

  const recentExp = () => {
    const today = new Date();
    const recent = [];
    if (data) {
      data.map((item) => {
        const date = new Date(item.createdAt);
        if (date.getMonth() === today.getMonth()) {
          recent.push(item);
        }
      });
    }
    return recent;
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

  return (
    <View style={styles.container}>
      {error && <Text style={{ color: "red" }}>{error}</Text>}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={recentExp()}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={ListEmptyComponent}
        renderItem={({ item }) => (
          <View style={styles.list}>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.nameView}>
                <Text style={styles.listname}>{item.name}</Text>
              </View>
              <View style={styles.updateView}>
                <TouchableOpacity onPress={() => navigateToUpdate(item._id)}>
                  <Ionicons name="create-outline" size={25} color="white" />
                </TouchableOpacity>
              </View>
              <View style={styles.deleteView}>
                <TouchableOpacity
                  onPress={() => deleteExp(item._id)}
                  disabled={loading}
                >
                  <Ionicons name="trash" size={25} color="white" />
                </TouchableOpacity>
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
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
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
