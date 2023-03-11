import { useEffect, createContext, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            console.log("login")
            return {user: action.payload}
            
        case 'LOGOUT':
            return {user: null}
            
        default:
            return state;
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer,{user:null})

    useEffect(() => {
        const getUser = async () => {
            const user = await AsyncStorage.getItem('user');
            if (user) {
                dispatch({ type: 'LOGIN', payload: JSON.parse(user) });
            }
        }
        getUser();
    }, []);


    
    return (
        <AuthContext.Provider value={{...state,dispatch}}>
            {children}
        </AuthContext.Provider>
    ) 
}