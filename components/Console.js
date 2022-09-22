import React, { useState, useEffect, useRef } from 'react'

import { View, StyleSheet, Text, FlatList, TouchableOpacity, StatusBar, TextInput, Image } from 'react-native'
import Picked from './Picked'
import Menu from './Menu'
import Room from './Room'
import Total from './Total'
import Receipt from './Receipt'
import ViewShot from 'react-native-view-shot'
import { BluetoothEscposPrinter } from 'react-native-bluetooth-escpos-printer';



const Console = ({ showConsole }) => {

  let one = useRef()
  let two = useRef()
  let three = useRef()
  let four = useRef()
  let app = useRef()
  let shop = useRef()
  let initTag = {
    '1': [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    '2': [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    '3': [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    '4': [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    'App': [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    'หน้าร้าน': [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  }
  // 1 = nomal, 2 = bitter, 3 = acid
  let initFlavor = {
    '1': [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    '2': [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    '3': [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    '4': [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    'App': [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    'หน้าร้าน': [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  }

  // const [room, setRoom] = useState({})
  const [pickroom, setPick] = useState('หน้าร้าน')
  const [currentList, setCurrentList] = useState([])

  const [show, setShow] = useState([])
  const [tag, setTag] = useState(initTag)
  const [flavor, setFlavor] = useState(initFlavor)
  const [reset, setReset] = useState(0)

  const [modalVisible, setModalVisible] = useState(false);


  useEffect(() => {
    setCurrentList([])
    if (pickroom === '1') one.current = []
    if (pickroom === '2') two.current = []
    if (pickroom === '3') three.current = []
    if (pickroom === '4') four.current = []
    if (pickroom === 'App') app.current = []
    if (pickroom === 'หน้าร้าน') shop.current = []
    setTag(prev => ({
      ...prev, [pickroom]: [1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    }))
    setFlavor(prev => ({
      ...prev, [pickroom]: [1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    }))
    setOrder(0)
    // console.log('reset');
  }, [reset])

  useEffect(() => {
    // setRoom(data => ({ ...data, [pickroom]: currentList }))
    if (pickroom === '1') {
      one.current = currentList
      setShow(one.current)
    }
    if (pickroom === '2') {
      two.current = currentList
      setShow(two.current)
    }
    if (pickroom === '3') {
      three.current = currentList
      setShow(three.current)
    }
    if (pickroom === '4') {
      four.current = currentList
      setShow(four.current)
    }
    if (pickroom === 'App') {
      app.current = currentList
      setShow(app.current)
    }
    if (pickroom === 'หน้าร้าน') {
      shop.current = currentList
      setShow(shop.current)
    }
    // console.log('pick');

  }, [currentList])

  useEffect(() => {
    setCurrentList([])
    if (one.current && pickroom === '1') {
      setCurrentList(one.current)
      setShow(one.current)
    }
    if (two.current && pickroom === '2') {
      setCurrentList(two.current)
      setShow(two.current)
    }
    if (three.current && pickroom === '3') {
      setCurrentList(three.current)
      setShow(three.current)
    }
    if (four.current && pickroom === '4') {
      setCurrentList(four.current)
      setShow(four.current)
    }
    if (app.current && pickroom === 'App') {
      setCurrentList(app.current)
      setShow(app.current)
    }
    if (shop.current && pickroom === 'หน้าร้าน') {
      setCurrentList(shop.current)
      setShow(shop.current)
    }
    // console.log('pickroom');

  }, [pickroom])
  // console.log('base');

  // console.log(` show :${pickroom}: > `, show);
  // console.log(` tag :${pickroom}: > `, tag[pickroom]);
  const viewShotRef = useRef();
  const nameRef = useRef();

  const [receipt, setReceipt] = useState('')
  const [name, setName] = useState('')

  const [haveData, setHaveData] = useState(false)
  const [order, setOrder] = useState(0)

  const printOut = () => {

    if (pickroom !== 'App' && pickroom !== 'หน้าร้าน') {
      try {
        haveData && setTimeout(async () => {
          await BluetoothEscposPrinter.printText('\r\n', {});
          await BluetoothEscposPrinter.printText(
            '________________________________',
            {},
          );
          await BluetoothEscposPrinter.printPic(receipt, {});
          await BluetoothEscposPrinter.printText(
            '________________________________',
            {},
          );
          // await BluetoothEscposPrinter.printPic(QRcode, { width: 300, left: 40 });
          await BluetoothEscposPrinter.printPic(name, { width: 370, });
          await BluetoothEscposPrinter.printText('\r\n\r\n', {});
        }, 500)

      } catch (e) {
        alert(e.message || 'ERROR');
      }

    }

    if (pickroom === 'หน้าร้าน') {
      try {
        haveData && setTimeout(async () => {
          await BluetoothEscposPrinter.printText('\r\n', {});
          await BluetoothEscposPrinter.printText(
            '________________________________',
            {},
          );
          await BluetoothEscposPrinter.printPic(receipt, {});
          await BluetoothEscposPrinter.printText(
            '________________________________',
            {},
          );
          // await BluetoothEscposPrinter.printText('\r\n\r\n', {});  
          await BluetoothEscposPrinter.printText('\r\n\r\n', {});
          await BluetoothEscposPrinter.printText('\r\n\r\n', {});
          await BluetoothEscposPrinter.printText('\r\n\r\n', {});
        }, 500)

      } catch (e) {
        alert(e.message || 'ERROR');
      }

    }

    if (order && pickroom === 'App') {
      try {
        (order > 0) && setTimeout(async () => {
          await BluetoothEscposPrinter.printText('\r\n', {});
          await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
          await BluetoothEscposPrinter.printText(order,
            {
              fonttype: 15,
              heigthtimes: 3,
              widthtimes: 2,
            });
          await BluetoothEscposPrinter.printText('\r\n\r\n', {});
          await BluetoothEscposPrinter.printText(
            '________________________________',
            {},
          );
          await BluetoothEscposPrinter.printPic(receipt, {});
          await BluetoothEscposPrinter.printText(
            '________________________________',
            {},
          );
          await BluetoothEscposPrinter.printText('\r\n\r\n', {});
          await BluetoothEscposPrinter.printText('\r\n\r\n', {});
          await BluetoothEscposPrinter.printText('\r\n\r\n', {});
        }, 500)
      } catch (e) {
        alert(e.message || 'ERROR');
      }

    }
  }

  return (
    <View style={[styles.container, { display: (showConsole ? null : 'none') }]}>
      <StatusBar hidden />

      {/* RECEIPT */}
      <Receipt show={show} setModalVisible={setModalVisible}
        modalVisible={modalVisible} tag={tag} pickroom={pickroom}
        flavor={flavor} viewShotRef={viewShotRef} setHaveData={setHaveData}
        currentList={currentList} setReceipt={setReceipt} nameRef={nameRef}
        setName={setName} />

      {/* LEFT  */}
      <View style={styles.leftBox} >

        {pickroom === 'App' ?
          <TextInput
            style={io.input}
            onChangeText={setOrder}
            value={order || ''}
            placeholder="Delivery Order No."
            keyboardType="numeric"
          /> : null}

        <FlatList data={show}
          renderItem={({ item }) => (
            <Picked item={item} show={show} setCurrentList={setCurrentList}
              setTag={setTag} tag={tag} flavor={flavor} setFlavor={setFlavor}
              pickroom={pickroom}
            />)}
        />
        <View style={text.space}></View>

        {/* PRINT */}
        <TouchableOpacity style={styles.cal}
          onPress={() => setModalVisible(true)}>
          <Text style={text.cal} >Total</Text>
          <Total show={show} setModalVisible={setModalVisible}
            modalVisible={modalVisible} tag={tag} pickroom={pickroom}
            flavor={flavor} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.print}
          // onPress={() => captureViewShot()}
          onPress={() => printOut()}
        // delayLongPress={400}
        >
          <Text style={text.print} >Print</Text>
        </TouchableOpacity>

      </View>

      {/* RIGHT */}
      <View style={styles.rightBox} >

        <View style={styles.room}>
          <Room pick={pickroom} setPick={setPick} setCurrentList={setCurrentList} setReset={setReset} />
        </View>

        <View style={styles.menu} >
          <Menu setCurrentList={setCurrentList} currentList={currentList} pickroom={pickroom} />
        </View>

      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#a9d3ff',
    display: 'none'
  },
  leftBox: {
    flex: 3,
    backgroundColor: '#a9d3ff',
  },
  cal: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    height: '9%',
    width: '23%',
    padding: 10,
    marginLeft: 10,
    marginBottom: 3,
    backgroundColor: '#e88873',
    borderRadius: 15,
    borderWidth: 3,
    borderColor: 'white'
  },
  print: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: '9%',
    width: '71%',
    padding: 10,
    marginRight: 8,
    marginBottom: 3,
    backgroundColor: '#7f7eff',
    borderRadius: 15,
    borderWidth: 3,
    borderColor: 'white'
  },

  rightBox: {
    flex: 6.2,
  },
  room: {
    flex: 0.15,
    width: '100%',

  },

  menu: {
    flex: 1,
    flexDirection: 'row',
    // backgroundColor: 'brown',
  }
})

const text = StyleSheet.create({
  cal: {
    color: 'white',
    fontFamily: 'Kanit-Medium',
    fontSize: 18,
  },
  print: {
    color: 'white',
    fontFamily: 'Kanit-Medium',
    fontSize: 25,
    marginTop: -5

  },
  space: {
    flexDirection: 'row',
    paddingVertical: 35,
    paddingHorizontal: 15,
    margin: 5,
  },
})

const io = StyleSheet.create({
  input: {
    height: 65,
    margin: 8,
    padding: 10,
    borderWidth: 2,
    fontSize: 30,
    fontWeight: 'bold',
    borderColor: 'white'
  },
});

export default Console