import { useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import UserProfile from "../components/UserProfile";
import { useLogout } from "../components/Logout";

export default function ProfileScreen() {
  const { getProfile, loading, error, fullname, email } = UserProfile();

  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    getProfile("63fdd7d04fa3479a1b470251");
  }, []);

  return (
    <View style={styles.container}>
      {error && <Text style={{ color: "red" }}>{error}</Text>}
      <View style={styles.texts}>
        <Text style={styles.fullname}> {fullname}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>
      <View style={styles.icon}>
        <Ionicons
          name="log-out"
          size={50}
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
});
