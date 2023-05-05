import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Runner } from '../types/Runner';



const url: string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsqlLXvQzap9hX2xdgmBKa-kxmoKP4G2ppPg&usqp=CAU'

const RunnerIcon = ({runner}: {runner: Runner}) => {

    return (
        <View style={{
            flex: 1,
            position: 'absolute',
            bottom: runner.positionV,
            left: runner.positionH,
        }}>
            <Image source={{uri: url}} style={styles.icon} />
            <Text style={styles.text}>{runner.username}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    icon: {
        height: 50,
        width: 50,
        borderRadius: 100,
        justifyContent: 'center',
        position: 'relative',
        },
    text: {
        textAlign: 'center',
        color: 'white',
    }
}
)

export default RunnerIcon