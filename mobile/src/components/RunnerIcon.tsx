import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { Runner } from '../types/Runner';



const url: string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsqlLXvQzap9hX2xdgmBKa-kxmoKP4G2ppPg&usqp=CAU'

const RunnerIcon = ({runner}: {runner: Runner}) => {
    
    const [currentPosV, setCurrentPosV] = React.useState<number>(runner.positionV)

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setCurrentPosV(currentPosV => currentPosV + 5)
    //     }, 1000);
    //     return () => clearInterval(interval);
    // }, []);

    return (
        <View style={{
            flex: 1,
            position: 'absolute',
            bottom: currentPosV,
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