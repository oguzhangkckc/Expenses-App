import { useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import UserProfile from "../components/UserProfile";
import { useLogout } from "../components/Logout";
import Expenses from "../components/Expenses";


export default function ProfileScreen() {
  const { getProfile, loading, error, fullname, email } = UserProfile();
  
  const { getExp , amount, data } = Expenses();

  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    getExp();
  }, []);
    
  useEffect(() => {
    getProfile("63fdd7d04fa3479a1b470251");
  }, []);

  const totalExp = () => {
    let total = 0;
    if (data) {
      data.map((item) => {
        total += item.amount;
      });
    }
    return total;
  };


  return (
    <View style={styles.container}>
      {error && <Text style={{ color: "red" }}>{error}</Text>}
      <View style={styles.texts}>
        <Text style={styles.fullname}> {fullname}</Text>
        <Text style={styles.email}>{email}</Text>
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
                onPress: () => handleLogout(),
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
    marginBottom: 10,
  },
  email: {
    fontSize: 20,
    color: "white",
    marginBottom: 20,
  },
  icon: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  texts: {
    position: "absolute",
    top: 100,
  },
  totalExp: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
    marginTop: 30,
  },
});
