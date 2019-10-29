import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Card } from 'react-native-paper';
import api from '../services/api.js'
import logo from '../../assets/policia.png'
import { NavigationBar } from 'navigationbar-react-native';

export default function Talao({navigation}) {
  const [talao, setTalao] = useState([])
  const [crm, setCrm] = useState([])
  const [orderCrm, setOrderCrm] = useState(crm)
  let qntd = crm.length
  let dia = new Date().getDate()
  let mes = new Date().getMonth()+1
  let ano = new Date().getFullYear()
  let hoje = (ano+'-'+mes+'-'+dia).toString()
  let agora = (dia+'/'+mes).toString()

  // gerenciando os FILTROS e carregando API
	useEffect(() => {
		async function fetchData() {
			// You can await here
			const response = await api.get(`talao/`);
			setTalao(response.data.results);

      const crm = await api.get('crm/');
      setCrm(crm.data.results)
		}
		fetchData();
	}, []); 

  function renderTalao(){
    return talao.map((talao) => {
      if(talao.data_talao == hoje){
        return (<>
        <View style={styles.talao}>
          <Text>
            <Text style={{fontSize: 22, fontWeight: 'bold'}}>Horario:</Text> <Text style={styles.labelTalao}>{talao.hora_chamada_talao.split('.')[0]}</Text>
            </Text>
          <Text>
            <Text style={{fontSize: 22, fontWeight: 'bold'}}>Tipo:</Text> <Text style={styles.labelTalao}>{talao.tipo_ocor_talao}</Text>
          </Text>
        </View>
        </>)
      }})
  }

  function renderCrm(){
    return crm.slice(0, 5).map((crm) => (
      <>
        <Text style={styles.labelCrm}>{crm.crm_crm} - {crm.nome_medico_crm} </Text>
      </>
    ))
  }

  // navigation

  const ComponentLeft = () => {
    return(
      <View style={{ flex: 1, alignItems: 'flex-start'}} >
      </View>
    );
  };
  
  const ComponentCenter = () => {
    return(
      <View style={{ flex: 1, }}>
        <Text style={styles.titulo}>Resumo</Text>
      </View>
    );
  };
  
  const ComponentRight = () => {
    return(
      <View style={{ flex: 1, alignItems: 'flex-end', }}>
        <Image
          source={require('../../assets/policia.png')}
          style={{resizeMode: 'contain', width: 200, height: 35 }}
        />
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
      <View style={styles.card}>
        <Text style={styles.label}>Talões</Text>
        <Text style={styles.sublabel}>Ocorrências de {agora}</Text>
        {renderTalao()}
        <TouchableOpacity
         style={styles.button}
         onPress={() => navigation.navigate('Talao')}
       >
        <Text style={{color: 'white', alignSelf: 'center', fontSize: 18}}>Detalhes..</Text>
       </TouchableOpacity>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Médicos</Text>
        <Text style={styles.sublabel}>Últimos Crm's Adicionados</Text>
        <View style={styles.cardCrm}>
          {renderCrm()}
        </View>
        <TouchableOpacity
         style={styles.button}
         onPress={() => navigation.navigate('Crm')}
       >
        <Text style={{color: 'white', alignSelf: 'center', fontSize: 18}}>Adicionar</Text>
       </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C2C2C2',
  },
  card: {
    alignSelf: 'stretch',
    marginTop: 10,
    backgroundColor: '#D5D5D5',
  },
  button: {
    alignSelf: 'center',
    backgroundColor: '#FE4949',
    padding: 8,
    borderRadius: 6,
    fontSize: 20,
    fontWeight: 'bold',
    width: '80%',
    marginTop: 15,
    marginBottom: 15
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FD2121',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10
  },
    titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FE4949'
  },
  sublabel:{
    fontSize: 16,
    fontWeight: 'bold',
    color: '#383838',
    alignSelf: 'center',
    marginBottom: 10,
  },
  labelCrm: {
    fontSize: 16,
    marginTop: 5,
    marginLeft: 20,
  },
  cardCrm: {
    width: '80%',
  },
  labelTalao: {
    fontSize: 18,
    marginTop: 5,
    marginLeft: 20,
  },
  talao: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 15,

  }
});
