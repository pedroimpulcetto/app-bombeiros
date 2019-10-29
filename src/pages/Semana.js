import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Card
} from 'react-native';

import logo from '../../assets/policia.png'
import { NavigationBar } from 'navigationbar-react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import api from '../services/api.js'

export default function Semana({navigation}) {
  const [talao, setTalao] = useState([])
  let [totTalao, setTotTalao] = useState(0)

  let dia = new Date().getDate()-7
  let mes = new Date().getMonth()+1
  let ano = new Date().getFullYear()
  let hoje = (ano+'-'+mes+'-'+dia).toString()
  let agora = (dia+'/'+mes).toString()

  useEffect(() => {
		async function fetchData() {
			// You can await here
			const response = await api.get(`talao/`);
			setTalao(response.data.results);
		}
		fetchData();
	}, []); 

  function renderTalao(){
    return talao.map((talao) => {
      if(talao.data_talao >= hoje){
        return (<>
        <View style={styles.talao}>
          <Text>
            <Text style={{fontSize: 22, fontWeight: 'bold'}}>Data:</Text> <Text style={styles.labelTalao}>{talao.data_talao}</Text>
            </Text>
          <Text>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>Horário:</Text> <Text style={{fontSize: 16}}>{talao.hora_chamada_talao.split('.')[0]}</Text>
            </Text>
          <Text>
            <Text style={{fontSize: 22, fontWeight: 'bold'}}>Tipo:</Text> <Text style={styles.labelTalao}>{talao.tipo_ocor_talao}</Text>
          </Text>
          <Text>
            <Text style={{fontSize: 22, fontWeight: 'bold'}}>Rua:</Text> <Text style={styles.labelTalao}>{talao.endereco_talao}</Text>
          </Text>
          <Text>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>Bairro:</Text> <Text style={{fontSize: 16}}>{talao.bairro_talao}</Text>
          </Text>
          <Text>
            <Text style={{fontSize: 22, fontWeight: 'bold'}}>Cmt:</Text> <Text style={styles.labelTalao}>{talao.comandante_talao}</Text>
          </Text>
        </View>
        </>)
      }})
  }


  // navigation

  const ComponentLeft = () => {
    return(
      <View style={{ flex: 1, alignItems: 'flex-start'}} >
        <TouchableOpacity style={{justifyContent:'center', flexDirection: 'row'}} onPress={() => navigation.navigate('Talao')}>
          <Image source={require('../../assets/goback.png')} style={{marginLeft: 15}}/>
        </TouchableOpacity>
      </View>
    );
  };
  
  const ComponentCenter = () => {
    return(
      <View style={{ flex: 1, }}>
        <Text style={styles.titulo}>Talões</Text>
      </View>
    );
  };
  
  const ComponentRight = () => {
    return(
      <View style={{ flex: 1, alignItems: 'flex-end', }}>
        <TouchableOpacity style={{justifyContent:'center', flexDirection: 'row'}} onPress={() => navigation.navigate('Resumo')}>
          <Image
            source={require('../../assets/principal.png')}
            style={{resizeMode: 'contain', width: 80, height: 35 }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  // fim navigation

  return (
    <SafeAreaView style={styles.container}>
      <NavigationBar
        componentLeft     = { () =>  <ComponentLeft />   }
        componentCenter   = { () =>  <ComponentCenter /> }
        componentRight    = { () =>  <ComponentRight />  }
        navigationBarStyle= {{ backgroundColor: '#C2C2C2' }}
        statusBarStyle    = {{ barStyle: 'light-content', backgroundColor: '#215e79' }}
      />
      <View style={{ height: '15%' }}>
        <Text>Total de Ocorrências Hoje: {totTalao}</Text>
      </View>
      <ScrollView 
        style={{ height: '65%' }}
      >
        <Text style={styles.sublabel}>Ocorrêcias da Semana</Text>
        {renderTalao()}
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C2C2C2',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
    titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FE4949'
  },
  talao: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 15,
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#1C1C1C',
    padding: 5,
  },
  labelTalao: {
    fontSize: 18,
    marginTop: 5,
    marginLeft: 20,
  },
  sublabel:{
    fontSize: 16,
    fontWeight: 'bold',
    color: '#383838',
    alignSelf: 'center',
    marginBottom: 10,
  },
});
