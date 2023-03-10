import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

import UserProfile from "../components/UserProfile";

export default function ProfileScreen() {
  const { getProfile, loading, error, fullname, email } = UserProfile();

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <View style={styles.container}>
      {error && <Text style={{ color: "red" }}>{error}</Text>}
      <Text style={styles.text}>Merhaba {fullname}</Text>
      <Text style={styles.text}>{email}</Text>
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
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
