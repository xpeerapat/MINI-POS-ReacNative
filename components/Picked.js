import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'

function Picked({ item, setTag, tag, pickroom, show,
  setCurrentList, setFlavor, flavor }) {

  const [idx, setIdx] = useState(0)
  const [count, setCount] = useState(0)

  const findIndext = () => {
    for (let i in show) {
      if (show[i]['name'] === item.name) {
        setIdx(i)
      }
    }
  }

  useEffect(() => {
    findIndext(item.name)
  }, [count, x])

  const getQuan = (cond) => {
    let clone = tag[pickroom]
    if (cond === 'plus') clone[idx] += 1
    else clone[idx] -= 1

    if (clone[idx] <= 0) clone[idx] = 1
    setTag(val => ({ ...val, [pickroom]: clone }))
    setCount(prev => prev + 1)
  }

  const del = (name) => {
    let clone = tag[pickroom]
    let clone2 = flavor[pickroom]
    clone.splice(idx, 1)
    clone2.splice(idx, 1)
    clone.push(1)
    clone2.push(1)
    setTag(val => ({ ...val, [pickroom]: clone }))
    setFlavor(val => ({ ...val, [pickroom]: clone2 }))

    setCurrentList(prev => {
      return prev.filter(item => item.name != name)
    })
  }

  const [x, setX] = useState(1)
  const getFlavor = () => {
    setX(prev => prev + 1)

    let clone = flavor[pickroom]
    clone[idx] += 1

    if (clone[idx] >= 4) clone[idx] = 1
    if (x >= 3) setX(1)
    setFlavor(val => ({ ...val, [pickroom]: clone }))

  }

  // console.log('idx', idx);
  // console.log('show  > ', show);
  // console.log('tag 1 > ', tag['1']);
  // console.log('flavor 1 > ', flavor['1']);

  return (
    <View style={styles.main}>

      <View style={styles.text}>
        {/* del */}
        <TouchableOpacity onPress={() => del(item.name)} >
          <Text style={text.x} > X </Text>
        </TouchableOpacity>
        <Text>&nbsp;&nbsp;&nbsp;</Text>

        {/* flavor */}
        <TouchableOpacity onPress={() => getFlavor()}>
          <Text style={(flavor[pickroom][idx] === 1)
            ? [text.flavor, ((item.name === 'ต้มกระดูกอ่อน' || item.name === 'ต้มเนื้อเปื่อย') && { fontSize: 18, paddingTop: 7 })]
            : (flavor[pickroom][idx] === 2
              ? [text.flavor2, ((item.name === 'ต้มกระดูกอ่อน' || item.name === 'ต้มเนื้อเปื่อย') && { fontSize: 18, paddingTop: 7 })]
              : [text.flavor3, ((item.name === 'ต้มกระดูกอ่อน' || item.name === 'ต้มเนื้อเปื่อย') && { fontSize: 18, paddingTop: 7 })]
            )}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.button}>
        {/* down */}
        <TouchableOpacity style={styles.up} onPress={() => getQuan('plus')}>
          <Text style={text.symbol} >+</Text>
        </TouchableOpacity>

        <Text style={text.quan} > {tag[pickroom][idx] ? tag[pickroom][idx] : 1} </Text>
        {/* up */}
        <TouchableOpacity style={styles.down} onPress={() => getQuan('minus')}>
          <Text style={text.symbol} >-</Text>
        </TouchableOpacity>

      </View>


      {/* <Text style={text.menu} >{item.quantity}</Text> */}
    </View >
  )
}

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    paddingVertical: 25,
    paddingHorizontal: 15,
    margin: 5,
    backgroundColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#5b4b49',

  },
  up: {
    flex: 0.33,
    marginHorizontal: 2,
    alignItems: 'center',
    backgroundColor: '#548c2f',
    borderRadius: 50
  },
  down: {
    flex: 0.33,
    marginHorizontal: 2,
    alignItems: 'center',
    backgroundColor: 'grey',
    borderRadius: 50
  },
  text: {
    flex: 1,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    flexDirection: 'row-reverse',
    // backgroundColor: 'black'
  }
})

const text = StyleSheet.create({
  flavor: {
    fontSize: 27,
    marginRight: 5,
    backgroundColor: 'white',
    color: 'black',
    fontFamily: 'Kanit-Medium',

  },
  flavor2: {
    fontSize: 27,
    marginRight: 5,
    color: 'white',
    backgroundColor: '#5e4352',
    borderRadius: 5,
    fontFamily: 'Kanit-Medium',

  },
  flavor3: {
    fontSize: 27,
    marginRight: 5,
    color: 'black',
    backgroundColor: '#F1ED76',
    fontFamily: 'Kanit-Medium',
    borderRadius: 5,
  },


  symbol: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'Kanit-Medium',

  },
  x: {
    fontSize: 27,
    marginLeft: -5,
    marginRight: -5,
    color: 'red',
    fontFamily: 'Kanit-Medium',

  },
  quan: {
    fontSize: 24,
    color: 'black',
    backgroundColor: 'white',
    fontFamily: 'Kanit-thin',

  },
})

{/* <Image source={{ uri: 'https://randomuser.me/api/portraits/men/8.jpg' }} */ }
export default Picked