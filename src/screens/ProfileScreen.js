import { useCallback, useEffect } from "react";
import { View, Text, StyleSheet, Alert, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { UseAuthContext } from "../hooks/UseAuthContext";
import * as ImagePicker from "expo-image-picker";

import { useLogout } from "../services/user/Logout";
import Expenses from "../services/expenses/Expenses";
import { TouchableOpacity } from "react-native-gesture-handler";
import UploadImage from "../services/user/UploadImage";
import { useFocusEffect } from "@react-navigation/native";

export default function ProfileScreen() {
  const { user } = UseAuthContext();
  const { addImage, fetchImage, error, image, setImage, imageData, progress } =
    UploadImage();
  const { getExp, data } = Expenses();
  const { logout } = useLogout();

  useFocusEffect(
    useCallback(() => {
      getExp();
      fetchImage();
    }, [image])
  );

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      console.log("image", image);
    }
  };

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
        {error && <Text style={{ color: "red" }}>{error}</Text>}
          <TouchableOpacity onPress={pickImage}>
            <View style={styles.uploadView}> 
            {image !== null ? (
              <Image source={{ uri: image }} style={styles.image} />
              ) : (
              <Image source={{ uri: imageData }} style={styles.image} />
              )}
            </View>
          </TouchableOpacity>
        {progress > 0 && (
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
            {progress}% uploaded
          </Text>
        )}
        <View>
          <TouchableOpacity
            style={styles.uploadBtn}
            onPress={() => addImage(image)}
          >
            <Text style={styles.uploadText}>Upload</Text>
          </TouchableOpacity>
        </View>
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
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  uploadBtn: {
    width: 200,
    height: 50,
    borderRadius: 100,
    backgroundColor: "#1aacf0",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "white",
    marginTop: 20,
  },
  uploadView: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#1aacf0",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "white",
    borderStyle: "dashed",
  },
  uploadText: {
    color: "white",
    fontSize: 20,
    opacity: 0.7,
    fontWeight: "bold",
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
