import {useState} from "react";
import { useNavigation } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import {UseAuthContext} from "../hooks/UseAuthContext";

const Login = (data) => {

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const {dispatch} = UseAuthContext();

    const navigation = useNavigation();

    const signIn = async (data) => {
        setIsLoading(true);
        setError(null);
        

        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const json = await response.json();
        console.log(json);
        if (!response.ok) {
            setIsLoading(false);
            setError(json.message);
        }
        if (response.ok) {
            setError(null);
            await AsyncStorage.setItem("token", JSON.stringify(json));
            dispatch({type: "LOGIN", payload: json});
            navigation.navigate("Main");
            setIsLoading(false);
        }
    };
    return {signIn, error, isLoading};
}

export default Login;