import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Choice from './Choice'
import { larb1, tom1, yang1, yum1, etc1 } from './data'
import { larb2, tom2, yang2, yum2, etc2 } from './data2'


function Menu({ setCurrentList, pickroom, currentList }) {

  const [larb, setLarb] = useState(larb1)
  const [tom, setTom] = useState(tom1)
  const [yang, setYang] = useState(yang1)
  const [yum, setYum] = useState(yum1)
  const [etc, setEtc] = useState(etc1)

  useEffect(() => {
    if (pickroom === 'App') {
      setLarb(larb2)
      setTom(tom2)
      setYang(yang2)
      setYum(yum2)
      setEtc(etc2)
    }
    else {
      setLarb(larb1)
      setTom(tom1)
      setYang(yang1)
      setYum(yum1)
      setEtc(etc1)
    }
  }, [pickroom])

  return (
    <View style={styles.type}>

      {/* ลาบ */}
      <View style={styles.space}>
      </View>
      <View style={styles.each}>
        <Choice item={larb[0]} modal={0} setCurrentList={setCurrentList} currentList={currentList} pickroom={pickroom} pork={0} />
        <Choice item={larb[1]} modal={0} setCurrentList={setCurrentList} currentList={currentList} pickroom={pickroom} pork={0} />
        <Choice item={larb[2]} modal={1} setCurrentList={setCurrentList} currentList={currentList} pickroom={pickroom} pork={0} />
        <Choice item={larb[3]} modal={1} setCurrentList={setCurrentList} currentList={currentList} pickroom={pickroom} pork={0} />
      </View>
      <View style={styles.each}>
        <Choice item={larb[4]} modal={0} setCurrentList={setCurrentList} currentList={currentList} pickroom={pickroom} pork={0} />
        <Choice item={larb[5]} modal={0} setCurrentList={setCurrentList} currentList={currentList} pickroom={pickroom} pork={1} />
        <Choice item={larb[6]} modal={0} setCurrentList={setCurrentList} currentList={currentList} pickroom={pickroom} pork={0} />
        <Choice item={larb[7]} modal={0} setCurrentList={setCurrentList} currentList={currentList} pickroom={pickroom} pork={2} />
      </View>
      <View style={styles.spacex}>
      </View>

      {/* ต้ม */}
      <View style={styles.each}>
        <Choice item={tom[0]} modal={0} setCurrentList={setCurrentList} currentList={currentList} pickroom={pickroom} pork={0} />
        <Choice item={tom[1]} modal={0} setCurrentList={setCurrentList} currentList={currentList} pickroom={pickroom} pork={1} />
        <Choice item={tom[2]} modal={1} setCurrentList={setCurrentList} currentList={currentList} pickroom={pickroom} pork={0} />
        <Choice item={tom[3]} modal={0} setCurrentList={setCurrentList} currentList={currentList} pickroom={pickroom} pork={2} />
      </View>
      <View style={styles.each}>
        <Choice item={tom[4]} modal={0} setCurrentList={setCurrentList} currentList={currentList} pickroom={pickroom} pork={0} />
        <Choice item={tom[6]} modal={0} setCurrentList={setCurrentList} currentList={currentList} pickroom={pickroom} pork={1} />
        <Choice item={tom[5]} modal={0} setCurrentList={setCurrentList} currentList={currentList} pickroom={pickroom} pork={0} />
        <Choice item={tom[7]} modal={0} setCurrentList={setCurrentList} currentList={currentList} pickroom={pickroom} pork={2} />
      </View>
      <View style={styles.spacex}>
      </View>

      {/* ย่าง */}
      <View style={styles.each}>
        <Choice item={yang[0]} modal={0} setCurrentList={setCurrentList} currentList={currentList} pickroom={pickroom} pork={1} />
        <Choice item={yang[1]} modal={0} setCurrentList={setCurrentList} currentList={currentList} pickroom={pickroom} pork={1} />
        <Choice item={yang[2]} modal={0} setCurrentList={setCurrentList} currentList={currentList} pickroom={pickroom} pork={0} />
        <Choice item={yang[3]} modal={0} setCurrentList={setCurrentList} currentList={currentList} pickroom={pickroom} pork={0} />
      </View>
      <View style={styles.space}>
      </View>

      {/* ยำ */}
      <View style={styles.each}>
        <Choice item={yum[0]} modal={0} setCurrentList={setCurrentList} currentList={currentList} pickroom={pickroom} pork={0} />
        <Choice item={yum[1]} modal={0} setCurrentList={setCurrentList} currentList={currentList} pickroom={pickroom} pork={1} />
        <Choice item={yum[2]} modal={0} setCurrentList={setCurrentList} currentList={currentList} pickroom={pickroom} pork={1} />
        <Choice item={yum[3]} modal={0} setCurrentList={setCurrentList} currentList={currentList} pickroom={pickroom} pork={0} />
      </View>
      <View style={styles.space}>
      </View>

      {/* อื่นๆ */}
      <View style={styles.each}>
        <Choice item={etc[0]} modal={0} setCurrentList={setCurrentList} currentList={currentList} pickroom={pickroom} pork={0} />
        <Choice item={etc[1]} modal={0} setCurrentList={setCurrentList} currentList={currentList} pickroom={pickroom} pork={0} />
        <Choice item={etc[2]} modal={1} setCurrentList={setCurrentList} currentList={currentList} pickroom={pickroom} pork={0} />
        <Choice item={etc[3]} modal={1} setCurrentList={setCurrentList} currentList={currentList} pickroom={pickroom} pork={0} />
      </View>

    </View>
  )
}
const styles = StyleSheet.create({
  type: {
    backgroundColor: '#93c48b',
    marginTop: 8,
    borderWidth: 5,
    borderColor: 'white',
    borderRadius: 10,
    margin: 3
  },
  each: {
    flex: 0.12,
    margin: 2,
    paddingHorizontal: 10,
    flexDirection: 'row',
    // backgroundColor: 'red'
  },
  space: {
    flex: 0.02,
    flexDirection: 'row',
  } // backgroundColor: 'black'
  ,
  spacex: {
    flex: 0.04,
    flexDirection: 'row',
    // backgroundColor: 'black'
  },
})

{/* <Image source={{ uri: 'https://randomuser.me/api/portraits/men/8.jpg' }} */ }
{/* <FlatList data={items}
  renderItem={({ item }) =>
    <Choice item={item} currentList={currentList}setCurrentList={setCurrentList currentList={currentList}pickroom={pickroom} pork={0}/>
   currentList={currentList}pickroom={pickroom} pork={0}/> */}
export default Menu