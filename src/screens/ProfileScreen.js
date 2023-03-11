import { useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { UseAuthContext } from "../hooks/UseAuthContext";

import { useLogout } from "../components/user/Logout";
import Expenses from "../components/expenses/Expenses";


export default function ProfileScreen() {
  const { user } = UseAuthContext();
  
  const { getExp, data } = Expenses();

  const { logout } = useLogout();


  useEffect(() => {
    getExp();
  }, [data]);

  const totalExp = () => {
    let total = 0;
    if (data) {
      data.map((item) => {
        total += item.amount;
      });
    }
    return total;
  };

  if (user === null) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
          Loading...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.texts}>
        <Text style={styles.fullname}>{user.email}</Text>
      </View>
      <View>
        <Ionicons name="person" size={200} color="white" />
      </View>
      <View>
        <Text style={styles.totalExp}>Total Exp : {totalExp()} $</Text>
      </View>
      <View style={styles.icon}>
        <Ionicons
          name="log-out"
          size={40}
          color="white"
          style={{ paddingLeft: 20 }}
          onPress={() =>
            Alert.alert("Are you sure you want to log out?", "", [
              {
                text: "Cancel",
                style: "cancel",
              },
              {
                text: "Log Out",
                onPress: () => logout(),
              },
            ])
          }
        />
        <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
          Log Out
        </Text>
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
  fullname: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
    marginBottom: 20,
  },
  email: {
    fontSize: 20,
    color: "white",
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
  texts: {
    position: "absolute",
    top: 100,
  },
  totalExp: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
    marginTop: 20,
  },
});
