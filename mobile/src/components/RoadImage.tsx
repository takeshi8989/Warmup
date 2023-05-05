
import React from 'react';
import {ImageBackground, StyleSheet, Text, View } from 'react-native';
import { ROAD_LENGTH_KM, ROAD_IMAGE_HEIGHT } from '../utils/constants';


const RoadImage = ({i}: {i: number}) => {
    const len: number = (ROAD_LENGTH_KM - i) * ROAD_IMAGE_HEIGHT
    return (
        <>
            <ImageBackground source={require('../../assets/road.jpg')} style={styles.image} />
            <View style={{flexDirection: 'row', alignItems: 'center', position: 'absolute', top: len}} >
                <View style={styles.line} />
                <View>
                    <Text style={styles.text}>{i} km</Text>
                </View>
                <View style={styles.line} />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    image: {
        height: ROAD_IMAGE_HEIGHT,
        justifyContent: 'center',
        position: 'relative',
    },
    text: {
        width: 50,
        fontSize: 15,
        textAlign: 'center',
        color: 'red',
        zIndex: 100
    },
    line : {
        flex: 1,
        height: 1,
        backgroundColor: 'red'
    }
});

export default RoadImage;