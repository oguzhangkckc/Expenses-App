import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

export default function FormSubmitBtn({title, onPress, disabled}) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} disabled={disabled}>
        <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#003b88',
        width: 200,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    text: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
})
