import { StyleSheet, View, Text, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import ViewShot from 'react-native-view-shot';

const Receipt = (
    { show, tag, flavor, pickroom, viewShotRef, setHaveData, currentList,
        setReceipt, QRref, setQRcode, nameRef, setName }) => {

    const [sum, setSum] = useState()

    async function captureViewShot() {
        const aa = await viewShotRef.current.capture()
        const bb = await QRref.current.capture()
        const dd = await nameRef.current.capture()
        setReceipt(aa)
        setQRcode(bb)
        setName(dd) 
    }

    useEffect(() => {
        let price = 0
        for (let i in show) {
            price += (show[i].price * tag[pickroom][i])
        }
        setSum(price)
        captureViewShot() 
    }, [show, tag, flavor, currentList])

    useEffect(() => {
        if (sum === 0) setHaveData(false)
        if (sum > 0) setHaveData(true)
    }, [sum, currentList])


    return (
        <>
            <View style={modals.modalPad}>


                <View style={modals.modalBottom}>


                    <ScrollView style={modals.modalMenu}>

                        <ViewShot ref={viewShotRef} style={{ backgroundColor: 'white' }}
                            options={{
                                fileName: "receipt",
                                format: "jpg",
                                quality: 1,
                                result: 'base64'
                            }} >

                            {show && show.map((item, idx) =>
                            (<View style={modals.eachItem} key={idx}>
                                <View style={((idx % 2) === 0) ? modals.detail : modals.detail2}>
                                    <Text style={styles.basePrice}>
                                        x{tag[pickroom][idx]}&nbsp;&nbsp;
                                    </Text>
                                    <View style={modals.title}>
                                        <Text style={styles.menu}>
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
                                            {tag[pickroom][idx] > 1 ? `@${item.price}.-` : ''}
                                        </Text>

                                        <Text style={styles.menu}>
                                            {item.price * tag[pickroom][idx]}.-
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
                                        {sum}.-
                                    </Text>
                                </View>
                            </View>
                        </ViewShot>

                    </ScrollView>
                    <ViewShot ref={QRref} style={{ backgroundColor: 'white', width: '60%', height: '40%' }}
                        options={{
                            fileName: "receipt",
                            format: "jpg",
                            quality: 1,
                            result: 'base64'
                        }} >
                        <Image
                            style={{ width: '100%', height: '100%' }}
                            source={{ uri: `https://promptpay.io/0992136402.png` }}
                        />
                    </ViewShot>
                </View>

                {/* pp */}
                <View style={modals.modalpp}>

                    <ViewShot ref={nameRef} style={{ backgroundColor: 'white' }}
                        options={{
                            fileName: "receipt",
                            format: "jpg",
                            quality: 1,
                            result: 'base64'
                        }} >
                        <Image source={require('./ppName.jpg')}
                            style={{ width: 55, height: 80 }} />
                    </ViewShot>
                </View>
            </View>

        </>
    )
}

const styles = StyleSheet.create({
    menu: {
        color: 'black',
        fontSize: 15,
        // fontFamily: 'Kanit-Medium',
    },
    flavor: {
        color: 'black',
        fontSize: 9,
        fontWeight: 'bold',
        // fontFamily: 'Kanit-Medium',
    },
    basePrice: {
        color: 'black',
        paddingTop: 4,
        fontSize: 10,
        // fontWeight: 'bold',
        // fontFamily: 'Kanit-Medium',
    },
    space: {
        marginTop: 10
    },
})

const modals = StyleSheet.create({
    modalPad: {
        position: 'absolute',
        left: '35%',
        top: '20%',
        height: '58%',
        width: '25%',
        // borderWidth: 1, 
        backgroundColor: 'white',
        // zIndex: 999

    },
    modalpp: {
        position: 'absolute',
        left: '110%',
        height: 'auto',
        width: '25%',
        // borderWidth: 1, 
        backgroundColor: 'white',
        // zIndex: 999

    },
    modalMenu: {
        width: '100%',
        height: '93%',
        overflow: 'scroll',
    },
    detail: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // backgroundColor: 'yellow',
    },
    detail2: {
        flexDirection: 'row',
        paddingVertical: 10,
        justifyContent: 'space-between',
        // backgroundColor: '#EBEBEB', //grey
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

export default Receipt