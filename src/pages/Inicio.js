import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import api from '../services/api.js';

import logo from '../../assets/policia.png';

export default function Inicio({ navigation }) {
  async function handleSubmit() {
    navigation.navigate('Resumo');
  }

  return (
    <View style={styles.container}>
      <Image source={logo} />
      <View style={styles.form}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={{fontSize: 24, color: 'white', fontWeight: 'bold'}}>ENTRAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C2C2C2',
  },
  form: {
    alignSelf: 'stretch',
    paddingHorizontal: 30,
    marginTop: 30,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#FE4949',
    padding: 20,
    borderRadius: 6,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
