import { useAtom } from 'jotai';
import React from 'react'
import { View, Text, StyleSheet, Pressable, Switch } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { activePaceAtom, paceAtom } from '../atoms/runner';

const SettingScreen = () => {
    const [pace, setPace] = useAtom(paceAtom)
    const [activePace, setActivePace] = useAtom(activePaceAtom)

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.heading}>Setting</Text>
        <View style={styles.formArea}>
            <View style={styles.flexRow}>
                <Text style={styles.text}>Pace Maker</Text>
                <Switch
                    onValueChange={() => setActivePace(!activePace)}
                    value={activePace}
                    />
            </View>
            <View style={styles.flexRow}>
                <TextInput style={styles.input} keyboardType='numeric'
                    onChangeText={text => setPace(parseInt(text))}
                    value={pace ? pace.toString(): ''}
                />
                <Text style={styles.text}>min / km</Text>
            </View>
            {/* <Pressable style={styles.button} onPress={handleSave}>
                <Text style={styles.btnText}>Save</Text>
            </Pressable> */}
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    heading: {
        fontSize: 30,
        textAlign: 'left',
        marginLeft: 30,
    },
    formArea: {
        marginTop: 30,
        marginHorizontal: 30,
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    input: {
        marginHorizontal: 10,
        fontSize: 20,
        width: 50,
        borderRadius: 5,
        borderWidth: 1,
        textAlign: 'center',
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        margin:10,
    },
    button: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 30
    },
    btnText: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
    }
});

export default SettingScreen