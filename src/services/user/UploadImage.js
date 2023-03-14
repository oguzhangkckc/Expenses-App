import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { UseAuthContext } from "../../hooks/UseAuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UploadImage = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const { dispatch } = UseAuthContext();
  const { user } = UseAuthContext();

  const navigation = useNavigation();

  const addImage = async (imageUri) => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("image", {
      uri: imageUri,
      type: "image/jpeg",
      name: new Date() + "_image",
    });

    const response = await fetch("http://localhost:3000/image/add-image", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user.token}`,
      },
      onUploadProgress: (progressEvent) => {
        setProgress(
            Math.round((progressEvent.loaded / progressEvent.total) * 100)
        );
        },
      body: formData,
    });

    const json = await response.json();
    console.log(json)
    if (!response.ok) {
      setLoading(false);
      setError(json.error);
      console.log("resim yüklenemedi")
    }
    if (response.ok) {
      await AsyncStorage.setItem("user", JSON.stringify(json));
      setError(null);
      dispatch({ type: "LOGIN", payload: json });
      setLoading(false);
      setImage(json.image);
      navigation.navigate("Profile");
      console.log("başarılı bir şekilde resim yüklendi");
    }
  };

  return {
    addImage,
    error,
    loading,
    image,
    setImage,
    progress,
  };
};

export default UploadImage;
