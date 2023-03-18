import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { UseAuthContext } from "../../hooks/UseAuthContext";

const UploadImage = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const { user } = UseAuthContext();
  const [imageUrl, setImageUrl] = useState(null);

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
  };
  
  const getImage = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:3000/image/get-image/${user.email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to retrieve image");
      }
      const imageBlob = await response.blob();
      const imageUrl = URL.createObjectURL(imageBlob);
      setImageUrl(imageUrl);
      console.log("imageUrl" + imageUrl)
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    addImage,
    getImage,
    error,
    loading,
    image,
    setImage,
    progress,
    imageUrl,
  };
};

export default UploadImage;
