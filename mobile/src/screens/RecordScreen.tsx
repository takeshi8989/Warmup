import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, StyleSheet } from 'react-native'


const time: number = 32
const distance: number = 3.4

const RecordScreen = () => {
  
  return (
    <SafeAreaView style={styles.container}>
        <View>
            <Text style={styles.text}>Record Screen</Text>
            <Text style={styles.text}>Time: {time} min</Text>
            <Text style={styles.text}>Distance: {distance} km</Text>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 30
    }
})

export default RecordScreen