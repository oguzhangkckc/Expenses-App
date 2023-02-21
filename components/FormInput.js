import { Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'

export default function FormInput({title, placeholder}) {
  return (
    <>
    <Text style={styles.headText}>{title}</Text>
    <TextInput style={styles.textInput} placeholder={placeholder}/>
    </>
  )
}
const styles= StyleSheet.create({
    textInput: {
        borderWidth: 1, 
        borderColor: '#003b88', 
        width: 200, 
        height: 40, 
        borderRadius: 10, 
        paddingHorizontal: 10, 
        marginBottom: 20
    },
    headText:{
        fontWeight: 'bold',
    }
})