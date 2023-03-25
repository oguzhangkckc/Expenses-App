import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { UseAuthContext } from "../../hooks/UseAuthContext";

const UploadImage = () => {
  const { user } = UseAuthContext();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

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
  
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `http://localhost:3000/image/add-image/${user.email}`);
    xhr.setRequestHeader("Authorization", `Bearer ${user.token}`);
    xhr.onload = () => {
      if (xhr.status === 201) {
        const response = JSON.parse(xhr.responseText);
        setError(null);
        setLoading(false);
        setImage(response.image);
        navigation.navigate("Profile");
        console.log("başarılı bir şekilde resim yüklendi");
      } else {
        const error = JSON.parse(xhr.responseText);
        setLoading(false);
        setError(error.message);
        console.log("resim yüklenemedi");
      }
    };
    xhr.onerror = () => {
      setLoading(false);
      setError("An error occurred while uploading the image.");
    };
    xhr.upload.onprogress = (progressEvent) => {
      setProgress(Math.round((progressEvent.loaded / progressEvent.total) * 100));
    };
    xhr.send(formData);
    console.log("formdata gönderildi");
    console.log("image", image);
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
