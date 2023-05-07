import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Runner } from '../types/Runner';
import { RUNNER_SIZE, ICON_SIZE } from '../utils/constants';



const defaultPic: string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsqlLXvQzap9hX2xdgmBKa-kxmoKP4G2ppPg&usqp=CAU'

const RunnerIcon = ({runner}: {runner: Runner}) => {

    return (
        <View style={{
            position: 'absolute',
            bottom: runner.positionV,
            left: runner.positionH,
            justifyContent: 'center',
            alignItems: 'center',
            width: RUNNER_SIZE,
            height: RUNNER_SIZE,
        }}>
            <Image source={{uri: runner.picture || defaultPic}} style={styles.icon} />
            <Text style={styles.text}>{runner.username}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    icon: {
        height: ICON_SIZE,
        width: ICON_SIZE,
        borderRadius: 100,
    },
    text: {
        textAlign: 'center',
        color: 'white',
    }
}
)

export default RunnerIcon