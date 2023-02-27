import AsyncStorage from '@react-native-async-storage/async-storage';
import { UseAuthContext } from '../hooks/UseAuthContext';
import { useNavigation } from "@react-navigation/native";


export const useLogout = () => {
    const { dispatch } = UseAuthContext();

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('user');
        }
        catch (e) {
            console.log(e);
        }
        dispatch({ type: 'LOGOUT' });

    };

    return { logout };
}