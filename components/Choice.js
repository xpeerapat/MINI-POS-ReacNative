import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, Modal, View, Pressable, Alert } from 'react-native'
import { aa1, bb1, omm1, somtam1, rice1 } from './choices'
import { aa2, bb2, omm2, somtam2, rice2 } from './choices2'

function Choice({ item, setCurrentList, currentList, modal, pickroom, pork }) {

    const [isModal, setIsModal] = useState(modal);
    const [currentChoice, setCurrentChoice] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        setIsModal(modal)
    }, [])

    const addMenu = (item) => {
        if (isModal === 0) add(item)
        else choice(item)
    }

    const add = (item) => {
        let pick = true
        for (i in currentList) {
            if (currentList[i].name === item.name) pick = false
        }
        if (!pick) Alert.alert('เพิ่มซ้ำบ่ได้', 'บ่ให้เพิ่ม')
        else setCurrentList(prev => [...prev, item])
        if (isModal === 1) setModalVisible(!modalVisible)
    }

    const choice = (item) => {
        let choice
        if (item.name === 'ก้อยซอย') choice = aa1
        if (item.name === 'ก้อยเสือ') choice = bb1
        if (item.name === 'อ่อม') choice = omm1
        if (item.name === 'ส้มตำ') choice = somtam1
        if (item.name === 'ข้าว') choice = rice1

        if (item.name === 'ก้อยซอย' && pickroom === 'App') choice = aa2
        if (item.name === 'ก้อยเสือ' && pickroom === 'App') choice = bb2
        if (item.name === 'อ่อม' && pickroom === 'App') choice = omm2
        if (item.name === 'ส้มตำ' && pickroom === 'App') choice = somtam2
        if (item.name === 'ข้าว' && pickroom === 'App') choice = rice2

        setCurrentChoice(choice)
        setModalVisible(!modalVisible)
    }

    return (
        <>
            <Pressable
                onPress={() => addMenu(item)}
                style={modal === 0
                    ? (pork === 1
                        ? styles.listPork
                        : (pork === 2 ? styles.listDuck : styles.list))
                    : styles.listToggle}>
                {({ pressed }) => (
                    <Text style={[styles.name, ((item.name === 'ต้มกระดูกอ่อน' || item.name === 'ต้มเนื้อเปื่อย') && { fontSize: 18, paddingTop: 8 })]}>
                        {pressed ? '' : item.name}
                    </Text>
                )}
            </Pressable>

            {/* Modal */}
            <Modal
                animationType="slide"
                statusBarTranslucent
                transparent={true}
                visible={modalVisible}>

                <Pressable onPress={() => setModalVisible(!modalVisible)}
                    style={modals.bgModal}>

                </Pressable>
                <View style={modals.modalPad}>
                    <View style={modals.modalTop}>
                        <Pressable
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={modals.modalClose}>X</Text>
                        </Pressable>

                    </View>

                    <View style={modals.modalBottom}>
                        {currentChoice && currentChoice.map((item, idx) => (<Pressable
                            key={idx}
                            onPress={() => add(item)}
                            style={styles.list}>
                            {({ pressed }) => (
                                <Text style={styles.name}>
                                    {pressed ? '' : item.name}
                                </Text>
                            )}
                        </Pressable>))}
                    </View>

                </View>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    list: {
        margin: 5,
        width: '23.6%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FEE99A',
        borderRadius: 8,
        borderWidth: 1.5,
        borderColor: 'white',

    },
    listToggle: {
        margin: 5,
        width: '23.6%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FEE99A',
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#ff3c38',
    },
    listPork: {
        margin: 5,
        width: '23.6%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8D1F6',
        borderRadius: 8,
        borderWidth: 1.5,
        borderColor: 'white',
    },
    listDuck: {
        margin: 5,
        width: '23.6%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7B479',
        borderRadius: 8,
        borderWidth: 1.5,
        borderColor: 'white',
    },
    name: {
        color: 'black',
        fontSize: 26,
        fontFamily: 'Kanit-Medium',

        // backgroundColor: 'purple'
    },
})
const modals = StyleSheet.create({
    bgModal: {
        position: 'relative',
        height: '100%',
        width: '100%',
        backgroundColor: 'black',
        opacity: 0.5,
        // backgroundColor: 'purple'
    },
    modalPad: {
        position: 'absolute',
        left: '16%',
        top: '30%',
        height: '40%',
        width: '70%',
        // backgroundColor: 'white', 
    },
    modalTop: {
        flex: 1.4,
        flexDirection: 'row-reverse',
        backgroundColor: 'grey',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,

    },
    modalClose: {
        fontSize: 28,
        fontWeight: 'bold',
        marginRight: 27,
        color: 'white',
    },
    modalBottom: {
        flex: 5,
        paddingTop: 80,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#93c48b',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    button: {
        backgroundColor: 'whtie',
    }
})

export default Choice