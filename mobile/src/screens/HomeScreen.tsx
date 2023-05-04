import React, {useRef, useState} from 'react';
import {ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import RunnerIcon from '../components/RunnerIcon';
import { Runner } from '../types/Runner';
import RunningButtons from '../components/RunningButtons';

const roadLength: number = 10
const imageHeight: number = 1000
let images: number[] = []
for(let i = roadLength; i > 0; i--) images.push(i)


const RoadImage = ({i}: {i: number}) => {
    const len: number = (roadLength - i) * imageHeight
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


const HomeScreen = () => {
    const [isRunning, setIsRunning] = useState<boolean>(false)
    const [runners, setRunners] = useState<Runner[]>([
        {userId: 'takeshi', username: 'takeshi', imageUrl: '', positionH: 100, positionV: 0}
    ])

    const scrollViewRef = useRef<ScrollView>(null);

    return (
        <View style={styles.container}>
            <ScrollView
                ref={scrollViewRef}
                onContentSizeChange={() => scrollViewRef?.current?.scrollToEnd({ animated: true })}
            >
                {images.map((i: number) => <RoadImage key={i} i={i} />)}
                {runners.map((runner: Runner, i: number) => (
                    <RunnerIcon key={i} runner={runner} />
                ))}
            </ScrollView>

            <RunningButtons 
                isRunning={isRunning}
                setIsRunning={setIsRunning}
                scrollViewRef={scrollViewRef}
                runners={runners} 
                setRunners={setRunners}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    image: {
        height: imageHeight,
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

export default HomeScreen