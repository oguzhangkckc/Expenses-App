import { View, Dimensions, StyleSheet, Text, Pressable} from 'react-native'
import React from 'react'

import FormSubmitBtn from '../components/FormSubmitBtn';
import FormInput from '../components/FormInput';

export default function LogInScreen({navigation}) {
    return (
    <View style={styles.container}>
        <Text style={styles.welcome}>Welcome Back</Text>
      <View style={styles.login}>
        <View style={styles.inputView}>
        <Text style={styles.textInput}>Login</Text>
        <View style={{marginBottom:30}}>
        <FormInput title="Email" placeholder="Example@email.com"/>
        <FormInput title="Password" placeholder="********"/>
        </View>
        <FormSubmitBtn title="Login" onPress={() => navigation.navigate("Main")}/>
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
    }
});