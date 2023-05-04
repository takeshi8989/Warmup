import React from 'react'
import { View, Text, Pressable, Alert ,StyleSheet, Dimensions, ScrollView } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Runner } from '../types/Runner';

interface Props {
    scrollViewRef: React.RefObject<ScrollView>
    isRunning: boolean
    setIsRunning: React.Dispatch<React.SetStateAction<boolean>>
    runners: Runner[]
    setRunners: React.Dispatch<React.SetStateAction<Runner[]>>
}

const RunningButtons = ({scrollViewRef, isRunning, setIsRunning, runners, setRunners}: Props) => {
    const windowWidth = Dimensions.get('window').width;

    const scrollToBottom = () => {
        scrollViewRef?.current?.scrollToEnd({ animated: true })
    }

    const alertStop = () => {
        Alert.alert('Stop Running?', '', [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {text: 'OK', onPress: () => {
                console.log('stop running')
                removeRunner()
                // spotRunner()
                setIsRunning(false)
            }},
        ]);
    }

    const alertRun = () => {
        Alert.alert('Start Running?', '', [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {text: 'OK', onPress: () => {
                console.log('start running')
                addNewRunner()
                scrollToBottom()
                setIsRunning(true)
            }},
        ]);
    }

    const addNewRunner = () => {
        const posH = Math.floor(Math.random() * windowWidth - 50)
        const newRunner: Runner = {
            userId: 'abc',
            username: 'abc',
            imageUrl: '',
            positionH: posH,
            positionV: 0
        }
        setRunners([...runners, newRunner])
    }

    const removeRunner = () => {
        setRunners(runners.filter(runner => runner.userId !== 'abc'))
    }

    return (
        <View style={styles.container}>
            {isRunning ? (
                <>
                    <Pressable style={styles.stopButton} onPress={alertStop} >
                        <Text style={styles.buttonText}>Stop</Text>
                    </Pressable>
                    <Pressable style={styles.targetButton} onPress={scrollToBottom} >
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