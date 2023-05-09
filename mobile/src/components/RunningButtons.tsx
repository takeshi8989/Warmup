import React from 'react'
import { View, Text, Pressable, Alert ,StyleSheet, ScrollView, Dimensions } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useRunner from '../hooks/useRunner';
import useRunning from '../hooks/useRunning';
import { useAtom, useAtomValue } from 'jotai';
import { isRunningAtom } from '../atoms/runner';
import { runnersAtom } from '../atoms/runner';
import { ROAD_LENGTH_KM, ROAD_IMAGE_HEIGHT } from '../utils/constants';
import { userInfoAtom } from '../atoms/auth';
import useFootstepsAudio from '../hooks/useFootstepsAudio';




interface Props {
    scrollViewRef: React.RefObject<ScrollView>
}

const RunningButtons = ({ scrollViewRef }: Props) => {
    const  { playSound } = useFootstepsAudio()

    const windowHeight = Dimensions.get('window').height
    const [isRunning, setIsRunning] = useAtom(isRunningAtom)
    const runners = useAtomValue(runnersAtom)
    const userInfo = useAtomValue(userInfoAtom)

    const { addNewRunner, removeRunner } = useRunner()
    const { watchUserLocation, stopUserLocation } = useRunning()

    const scrollToBottom = () => {
        scrollViewRef?.current?.scrollToEnd({ animated: true })
    }

    const spotRunner = (): void => {
        const userId = userInfo?.id
        const runner = runners.find(runner => runner.userId === userId)
        if (!runner) return
        const top: number = (ROAD_IMAGE_HEIGHT * ROAD_LENGTH_KM) - runner.positionV
        scrollViewRef?.current?.scrollTo({ y: top - windowHeight / 2, animated: true })
    }

    const alertStop = () => {
        spotRunner()
        Alert.alert('Stop Running?', '', [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {text: 'OK', onPress: () => {
                console.log('stop running')
                removeRunner()
                setIsRunning(false)
                stopUserLocation()
            }},
        ]);
    }

    const alertRun = () => {
        playSound()
        Alert.alert('Start Running?', '', [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {text: 'OK', onPress: () => {
                console.log('start running')
                startRunning()
            }},
        ]);
    }

    const startRunning = () => {
        addNewRunner()
        scrollToBottom()
        setIsRunning(true)
        watchUserLocation()
    }


    return (
        <View style={styles.container}>
            {isRunning ? (
                <>
                    <Pressable style={styles.stopButton} onPress={alertStop} >
                        <Text style={styles.buttonText}>Stop</Text>
                    </Pressable>
                    <Pressable style={styles.targetButton} onPress={spotRunner} >
                        <MaterialCommunityIcons name="target" size={40} color="green" />
                    </Pressable>
                </>
            ) : (
                <>
                    <Pressable style={styles.runButton} onPress={alertRun} >
                        <Text style={styles.buttonText}>Run</Text>
                    </Pressable>
                    <Pressable style={styles.targetButton} onPress={scrollToBottom} >
                        <MaterialCommunityIcons name="target" size={40} color="green" />
                    </Pressable>
                </>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 0,
        bottom: 0,
        height: 250,
        width: '100%',
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    runButton : {
        position: 'relative',
        marginRight: '5%',
        marginLeft: '18%',
        borderRadius: 10,
        width: '40%',
        height: 60,
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
    },
    stopButton: {
        position: 'relative',
        marginRight: '5%',
        marginLeft: '18%',
        borderRadius: 10,
        width: '40%',
        height: 60,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 40,
        textAlign: 'center',
        color: 'white',
        marginVertical: 'auto'
    },
    targetButton : {
        position: 'relative',
        borderRadius: 20,
        height: 60,
        width: 60,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    targetIcon: {
        color: 'green'
    }
      
});

export default RunningButtons