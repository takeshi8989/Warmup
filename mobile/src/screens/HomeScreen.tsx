import React, { useRef, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import RunnerIcon from '../components/RunnerIcon';
import { Runner } from '../types/Runner';
import RunningButtons from '../components/RunningButtons';
import RoadImage from '../components/RoadImage';
import { ROAD_LENGTH_KM } from '../utils/constants';
import { runnersAtom } from '../atoms/runner';
import { useAtom } from 'jotai';
import { socket } from '../utils/socket';
import useRunner from '../hooks/useRunner';
import useFootstepsAudio from '../hooks/useFootstepsAudio';


interface Props {
    navigation: any
}

let images: number[] = []
for(let i = ROAD_LENGTH_KM; i > 0; i--) images.push(i)

const HomeScreen = ({ navigation } : Props) => {
    const [runners, setRunners] = useAtom(runnersAtom)
    const scrollViewRef = useRef<ScrollView>(null);
    const { getNearbyRunners } = useRunner();
    const { chooseAudio } = useFootstepsAudio();

    const receiveRunners = (runners: Runner[]) => {
        setRunners(runners)
        chooseAudio(getNearbyRunners(runners))
    }


    useEffect(() => { 
        // console.log(userInfo)
        socket.on('send_runners', receiveRunners)
        return () => {
            socket.off('send_runners', receiveRunners)
        }
    }, [runners])


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
                scrollViewRef={scrollViewRef}
                navigation={navigation}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    }
});

export default HomeScreen