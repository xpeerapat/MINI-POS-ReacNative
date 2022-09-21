import { StyleSheet, View, Text, Modal, Pressable, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'

const Total = ({ setModalVisible, modalVisible, show, tag, flavor, pickroom }) => {

    const [sum, setSum] = useState()

    useEffect(() => {
        let price = 0
        for (let i in show) {
            price += (show[i].price * tag[pickroom][i])
        }
        setSum(price)
    }, [show, tag, flavor])

    // async function viewShotRef() {
    //     const imageURI = await ref.current.capture()
    // } 

    // useEffect(() => {
    //     // on mount
    //     viewShotRef.current.capture().then(uri => {
    //         console.log("do something with ", uri);
    //     }).catch(function (error) {
    //         console.log('There has been a problem with your fetch operation: ' + error.message);
    //     });
    // }, []);

    // options={{ fileName: "receipt", format: "jpg", quality: 0.9 }}
    return (
        <>
            <Modal
                animationType="slide"
                statusBarTranslucent
                transparent={true}
                visible={modalVisible}>

                <Pressable onPress={() => setModalVisible(!modalVisible)}
                    style={modals.bgModal}>

                </Pressable>

                <View style={modals.modalPad} >

                    <View style={modals.modalTop}>
                        <Pressable
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={modals.modalClose}>X</Text>
                        </Pressable>
                    </View>

                    <View style={modals.modalBottom}>

                        <Text style={styles.total}>
                            ทั้งหมด
                        </Text>

                        <ScrollView style={modals.modalMenu}>

                            {show && show.map((item, idx) =>
                            (<View style={modals.eachItem} key={idx}>
                                <View style={((idx % 2) === 0) ? modals.detail : modals.detail2}>
                                    <Text style={styles.basePrice}>
                                        x{tag[pickroom][idx]}&nbsp;&nbsp;
                                    </Text>
                                    <View style={modals.title}>
                                        <Text style={[styles.menu, ((item.name === 'ต้มกระดูกอ่อน' || item.name === 'ต้มเนื้อเปื่อย') && { fontSize: 22, paddingTop: 15 })]}>
                                            {item.name}&nbsp;
                                            <Text style={styles.flavor}>
                                                {flavor[pickroom][idx] === 1
                                                    ? ''
                                                    : (flavor[pickroom][idx] === 2 ? '(ขม)' : '(เปรี้ยว)')
                                                }
                                            </Text>
                                        </Text>
                                    </View>
                                    <View style={modals.price}>
                                        <Text style={styles.basePrice}>
                                            {tag[pickroom][idx] > 1 ? `@${item.price}` : ''}
                                        </Text>

                                        <Text style={styles.menu}>
                                            {item.price * tag[pickroom][idx]}
                                        </Text>
                                    </View>
                                </View>
                            </View>))}
                            <View style={styles.space}></View>
                            <View style={modals.detail}>
                                <View style={modals.title}>
                                    <Text style={styles.menu}>
                                    </Text>
                                </View>
                                <View style={modals.price}>
                                    <Text style={styles.menu}>
                                        รวม
                                    </Text>
                                    <Text style={styles.menu}>
                                        {sum}
                                    </Text>
                                </View>
                            </View>

                        </ScrollView>

                    </View>

                </View>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    total: {
        marginTop: -75,
        marginBottom: 40,
        color: 'white',
        fontSize: 25,
        fontFamily: 'Kanit-Medium',

        // fontWeight: 'bold',
        // backgroundColor: 'purple'
    },
    menu: {
        color: 'black',
        fontSize: 35,
        fontFamily: 'Kanit-Medium',
    },
    flavor: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Kanit-Medium',
    },
    basePrice: {
        color: 'black',
        paddingTop: 15,
        fontSize: 23,
        fontWeight: 'bold',
        // fontFamily: 'Kanit-Medium',
    },
    space: {
        marginTop: 21
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
        left: '21%',
        top: '10%',
        height: '80%',
        width: '60%',
        // backgroundColor: 'white', 
        borderWidth: 2,
        borderRadius: 20,
    },
    modalTop: {
        flex: 1,
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
        marginTop: 5
    },
    modalBottom: {
        flex: 9,
        paddingTop: 20,
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    modalMenu: {
        height: '93%',
        width: '100%',
        paddingTop: 10,
        overflow: 'scroll',
        marginBottom: 30,
        // backgroundColor: 'grey',
    },
    detail: {
        flexDirection: 'row',
        paddingHorizontal: 60,
        justifyContent: 'space-between',
        // backgroundColor: 'yellow',
    },
    detail2: {
        flexDirection: 'row',
        paddingHorizontal: 60,
        justifyContent: 'space-between',
        backgroundColor: '#EBEBEB', //grey
    },
    title: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    price: {
        flex: 0.65,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // backgroundColor: 'green',
    }
})

export default Total