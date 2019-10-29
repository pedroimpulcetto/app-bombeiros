import React, { useState } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native'

export default function Loader(activate){
  const [load, setLoad] = useState(false)

  function loading(){
    setTimeout(() => {
      setLoad(true)
    }, 3000)
  }

    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#FE4949" />
      </View>
    )
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(194, 194, 194, 0.5)',
  },
})
