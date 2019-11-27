import React, { useState, useEffect } from 'react';
import {
	Container,
	StyleSheet,
	Image,
	View,
	Text,
	SafeAreaView,
	TouchableOpacity,
	ScrollView,
	Button,
	Platform,
	StatusBar
} from 'react-native';
import { Card } from 'react-native-elements';

import { NavigationBar } from 'navigationbar-react-native';
import api from '../services/api.js';

import DetailTalao from '../components/detailTalao.js';
import toticon from '../../assets/tot.png';
import resicon from '../../assets/res.png';
import incicon from '../../assets/inc.png';
import salvicon from '../../assets/salv.png';

export default function Talao({ navigation }) {
	const [ talao, setTalao ] = useState([]);
	let [ totTalao, setTotTalao ] = useState(0);

	let dia = new Date().getDate();
	let mes = new Date().getMonth() + 1;
	let ano = new Date().getFullYear();
	let hoje = (ano + '-' + mes + '-' + dia).toString();
	let agora = (dia + '/' + mes).toString();

	useEffect(() => {
		async function fetchData() {
			// You can await here
			const response = await api.get(`talao/`);
			setTalao(response.data.results);
		}
		fetchData();
	}, []);

	function renderTalao() {
		return talao.map((talao) => {
			if (talao.data_talao == hoje) {
				return (
					<TouchableOpacity style={styles.talao} key={talao.id}>
						<Text>
							<Text style={{ fontSize: 22, fontWeight: 'bold' }}>Horário:</Text>{' '}
							<Text style={styles.labelTalao}>{talao.hora_chamada_talao.split('.')[0]}</Text>
						</Text>
						<Text>
							<Text style={{ fontSize: 22, fontWeight: 'bold' }}>Tipo:</Text>{' '}
							<Text style={styles.labelTalao}>{talao.tipo_ocor_talao}</Text>
						</Text>
						<Text>
							<Text style={{ fontSize: 22, fontWeight: 'bold' }}>Rua:</Text>{' '}
							<Text style={styles.labelTalao}>{talao.endereco_talao}</Text>
						</Text>
						<Text>
							<Text style={{ fontSize: 18, fontWeight: 'bold' }}>Bairro:</Text>{' '}
							<Text style={{ fontSize: 16 }}>{talao.bairro_talao}</Text>
						</Text>
						<Text>
							<Text style={{ fontSize: 22, fontWeight: 'bold' }}>Cmt:</Text>{' '}
							<Text style={styles.labelTalao}>{talao.comandante_talao}</Text>
						</Text>
					</TouchableOpacity>
				);
			}
		});
	}

	let salv = 0;
	let res = 0;
	let inc = 0;
	let tot = 0;

	talao.map((talao) => {
		if (talao.data_talao == hoje) {
			tot += 1;
			if (talao.tipo_ocor_talao == 'RESGATE') {
				res += 1;
			}
			if (talao.tipo_ocor_talao == 'INCÊNDIO') {
				inc += 1;
			}
			if (talao.tipo_ocor_talao == 'SALVAMENTO') {
				salv += 1;
			}
		}
	});

	// navigation

	const ComponentLeft = () => {
		return (
			<View style={{ flex: 1, alignItems: 'flex-start' }}>
				<TouchableOpacity
					style={{ justifyContent: 'center', flexDirection: 'row' }}
					onPress={() => navigation.navigate('Resumo')}
				>
					<Image source={require('../../assets/goback.png')} style={{ marginLeft: 15 }} />
				</TouchableOpacity>
			</View>
		);
	};

	const ComponentCenter = () => {
		return (
			<View style={{ flex: 1 }}>
				<Text style={styles.titulo}>Talões</Text>
			</View>
		);
	};

	const ComponentRight = () => {
		return (
			<View style={{ flex: 1, alignItems: 'flex-end' }}>
				<Image
					source={require('../../assets/policia.png')}
					style={{ resizeMode: 'contain', width: 80, height: 35 }}
				/>
			</View>
		);
	};

	// fim navigation

	return (
		<View style={styles.container}>
			<View style={{ backgroundColor: '#D5D5D5' }}>
				<NavigationBar
					componentLeft={() => <ComponentLeft />}
					componentCenter={() => <ComponentCenter />}
					componentRight={() => <ComponentRight />}
					navigationBarStyle={{ backgroundColor: '#D5D5D5' }}
					statusBarStyle={{ barStyle: 'light-content', color: '#215e79' }}
				/>
			</View>
			<View style={{ height: '15%', marginLeft: 5, marginRight: 5, marginTop: 15 }}>
				<View style={{ flexDirection: 'row' }}>
					<Image source={toticon} style={{ resizeMode: 'contain', width: 50, height: 25 }} />
					<DetailTalao descricao={'Total Hoje: '} valor={tot} />
					<Image source={resicon} style={{ resizeMode: 'contain', width: 50, height: 25 }} />
					<DetailTalao descricao={'Resgate: '} valor={res} />
				</View>
				<View style={{ flexDirection: 'row', marginTop: 15 }}>
					<Image source={incicon} style={{ resizeMode: 'contain', width: 50, height: 25 }} />
					<DetailTalao descricao={'Incêncido: '} valor={inc} />
					<Image source={salvicon} style={{ resizeMode: 'contain', width: 50, height: 25 }} />
					<DetailTalao descricao={'Salvam: '} valor={salv} />
				</View>
			</View>
			<ScrollView style={{ height: '65%' }}>
				<Text style={styles.sublabel}>Ocorrêcias de {agora}</Text>
				{renderTalao()}
			</ScrollView>

			<View style={{ height: '10%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
				<TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Ontem')}>
					<Text style={{ color: 'white', alignSelf: 'center', fontSize: 18 }}>Ontem</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Semana')}>
					<Text style={{ color: 'white', alignSelf: 'center', fontSize: 18 }}>Semana</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#C2C2C2',
		flexDirection: 'column',
		paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
	},
	titulo: {
		fontSize: 22,
		fontWeight: 'bold',
		color: '#FE4949'
	},
	button: {
		alignSelf: 'center',
		backgroundColor: '#FE4949',
		padding: 8,
		borderRadius: 6,
		fontSize: 20,
		fontWeight: 'bold',
		width: '40%',
		marginTop: 5,
		marginBottom: 5
	},
	talao: {
		marginTop: 5,
		marginBottom: 5,
		marginLeft: 15,
		marginRight: 15,
		borderWidth: 2,
		borderColor: '#1C1C1C',
		paddingLeft: 20,
		backgroundColor: '#D3D3D3',
		borderRadius: 20,
		padding: 10
	},
	labelTalao: {
		fontSize: 18,
		marginTop: 5,
		marginLeft: 20
	},
	sublabel: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#383838',
		alignSelf: 'center',
		marginBottom: 10
	}
});
