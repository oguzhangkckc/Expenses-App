import { StyleSheet, Dimensions, KeyboardAvoidingView, Pressable, Text, View } from 'react-native'
import React from 'react'
import FormInput from '../components/FormInput'
import FormSubmitBtn from '../components/FormSubmitBtn'

export default function SignUpScreen({navigation}) {
  return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome</Text>
        <View style={styles.login}>
          <View style={styles.inputView}>
            <Text style={styles.textInput}>Sign Up</Text>
            <FormInput title="Username" placeholder="Username"/>
            <FormInput title="Email" placeholder="Example@email.com"/>
            <FormInput title="Password" placeholder="********"/>
            <FormInput title="Confirm Password" placeholder="********"/>
            <FormSubmitBtn title="SignUp" onPress={() => navigation.navigate("Main")}/>
            <Pressable style={{marginTop:20}} onPress={() => navigation.navigate("Login")}>
            <Text>
              Do you have an account? Login!
            </Text>
            </Pressable>
          </View>
        </View>
      </View>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#cfeffd',
    flex: 1,
    paddingTop: 100,
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
 textInput: {
    fontSize: 30, 
    fontWeight: 'bold', 
    color: '#003b88', 
    paddingBottom: 20, 
    marginTop:80
},
 inputView: {
    paddingBottom: 150,
    paddingTop: 50,
    width: Dimensions.get("window").width,
    alignItems:"center"
  },
  welcome: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#003b88',
    paddingBottom: 20,
    marginTop:80
  },
});