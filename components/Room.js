import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const Room = ({ pick, setPick, setReset }) => {

    const restart = () => {
        setReset(prev => prev + 1)
    }

    return (
        <View style={style.main} >

            <TouchableOpacity style={style.Box}
                onPress={() => setPick('1')} >
                <Text style={pick == '1' ? style.texted : style.text} > 1</Text>
            </TouchableOpacity >

            <TouchableOpacity style={style.Box}
                onPress={() => setPick('2')}>
                <Text style={pick == '2' ? style.texted : style.text} > 2</Text>
            </TouchableOpacity>

            <TouchableOpacity style={style.Box}
                onPress={() => setPick('3')}>
                <Text style={pick == '3' ? style.texted : style.text} > 3</Text>
            </TouchableOpacity>

            <TouchableOpacity style={style.Box}
                onPress={() => setPick('4')}>
                <Text style={pick == '4' ? style.texted : style.text} > 4</Text>
            </TouchableOpacity>

            <TouchableOpacity style={style.space}
                onPress={() => restart()}>
                <Image source={require('./Capture.jpg')}
                    style={{ width: 70, height: 60, borderRadius: 50, borderWidth: 3, borderColor: 'white' }} />
            </TouchableOpacity>

            <TouchableOpacity style={style.Box}
                onPress={() => setPick('App')}>
                <Text style={pick == 'App' ? style.texted : style.text} > App</Text>
            </TouchableOpacity>

            <TouchableOpacity style={style.Box}
                onPress={() => setPick('หน้าร้าน')}>
                <Text style={pick == 'หน้าร้าน' ? style.texted : style.text} > หน้าร้าน</Text>
            </TouchableOpacity>
        </View>
    )
}

const style = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#a9d3ff',
        borderRadius: 15,
        borderWidth: 2,
        borderColor: 'white',
        marginTop: 4,
        marginRight: 8
    },
    Box: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'yellow',
    },
    text: {
        flex: 1,
        height: '85%',
        margin: 8,
        color: 'black',
        fontSize: 20,
        borderWidth: 2,
        borderColor: '#5b4b49',
        backgroundColor: 'white',
        fontFamily: 'Kanit-Medium',
        borderRadius: 5,

    },
    texted: {
        flex: 1,
        height: '85%',
        margin: 8,
        color: 'white',
        fontFamily: 'Kanit-Medium',
        fontSize: 20,
        borderWidth: 2,
        borderColor: '#5b4b49',
        backgroundColor: '#ff3c38',
        borderRadius: 5,
    },
    space: {
        flex: 0.7,
        margin: 8,
        color: 'black',
        borderRadius: 100,
        // backgroundColor: 'white',
        borderColor: '#5b4b49',

    },
})


export default Room