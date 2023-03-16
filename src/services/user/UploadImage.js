import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

import { UseAuthContext } from "../../hooks/UseAuthContext";

const UploadImage = () => {
  const { user } = UseAuthContext();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [imageData, setImageData] = useState(null);

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

  const fetchImage = async () => {
    try{
      const response = await fetch(`http://localhost:3000/image/get-image/${user.email}`);
      const blob = await response.blob();
      const image = URL.createObjectURL(blob);
      setImageData(image);
      console.log("image çekildi");
    } catch (error) {
      setError("An error occurred while fetching the image.");
    }
  };

  
  return {
    addImage,
    fetchImage,
    error,
    loading,
    image,
    setImage,
    imageData,
    setImageData,
    setError,
    progress,
  };
};

export default UploadImage;
