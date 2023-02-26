import { View, Dimensions, StyleSheet, Text, Pressable, TextInput, AsyncStorage} from 'react-native'
import React, { useState}from 'react'

import FormSubmitBtn from '../components/FormSubmitBtn';

export default function LogInScreen({navigation}) {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitForm = async () => {    
    
        const response = await fetch('http://localhost:3000/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        if(email === '' || password === ''){
            alert("Please fill all the fields")
        }else{
        const data = await response.json()
        console.log(data)
        if(data.status === 200){
            navigation.navigate("Main")
            console.log("giriş yapıldı")
        }else{
            alert("Invalid Credentials")
        }
    }}


    return (
    <View style={styles.container}>
        <Text style={styles.welcome}>Welcome Back</Text>
      <View style={styles.login}>
        <View style={styles.inputView}>
        <Text style={styles.textInput}>Login</Text>
        <View style={{marginBottom:30}}>
        <Text style={styles.headText}>Email</Text>
        <TextInput 
            style={styles.loginInput} 
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="white" 
            placeholder="Example@email.com"/>
        <Text style={styles.headText}>Password</Text>
        <TextInput 
            style={styles.loginInput} 
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="white" 
            secureTextEntry={true}
            placeholder="********"/>
        </View>
        <FormSubmitBtn title="Login"  onPress={submitForm}/>
        <Pressable style={{marginTop:20}} onPress={() => navigation.navigate("SignUp")}>
          <Text>
          Create an account!
          </Text>
        </Pressable>
    </View>
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#cfeffd',
        paddingTop: 200,
        alignItems: 'center',
    },
    login: {
        backgroundColor: '#1aacf0',
        width: 300,
        height: 500,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        paddingHorizontal: 50,
    },
    inputView: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 100,
        paddingTop: 100,
        width: Dimensions.get("window").width,
    },
    textInput: {
        fontSize: 30, 
        fontWeight: 'bold', 
        color: '#003b88', 
        paddingBottom: 70

    },
    welcome: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#003b88',
        paddingBottom: 20,
        marginBottom: 20,
    },
    headText:{
        fontWeight: 'bold',
        color: 'white',
    },
    loginInput: {
        borderWidth: 1, 
        borderColor: '#003b88', 
        width: 200, 
        height: 40, 
        borderRadius: 10, 
        paddingHorizontal: 10, 
        marginBottom: 20
    }
});