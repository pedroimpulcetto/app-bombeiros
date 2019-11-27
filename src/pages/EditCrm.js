import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	Image,
	View,
	Text,
	SafeAreaView,
	TouchableOpacity,
	ScrollView,
	Platform,
	StatusBar
} from 'react-native';
import { Card } from 'react-native-paper';
import api from '../services/api.js';
import logo from '../../assets/policia.png';
import { NavigationBar } from 'navigationbar-react-native';

export default function EditCrm({ navigation }) {
	const [ talao, setTalao ] = useState([]);
	const [ crm, setCrm ] = useState([]);

	// gerenciando os FILTROS e carregando API
	useEffect(() => {
		async function fetchData() {
			const crm = await api.get('crm/');
			setCrm(crm.data.results);
		}
		fetchData();
	}, []);

	// async function handleSubmit(crm) {
	//   await api.post(`crm/${crm.id}`, {
	//     crm_crm: num,
	//     nome_medico_crm: nome
	//   })

	//   navigation.navigate('Resumo')
	// }

	function renderCrm() {
		return crm.map((crm) => (
			<View style={styles.cardEdit} key={crm.crm_crm}>
				<Text style={styles.labelCrm}>
					{crm.crm_crm} - {crm.nome_medico_crm}{' '}
				</Text>
				<TouchableOpacity onPress={() => navigation.navigate('Crm')}>
					<Image
						source={require('../../assets/edit.png')}
						style={{ resizeMode: 'contain', width: 50, height: 30 }}
					/>
				</TouchableOpacity>
			</View>
		));
	}

	// navigation

	const ComponentLeft = () => {
		return (
			<View style={{ flex: 1, alignItems: 'flex-start' }}>
				<TouchableOpacity
					style={{ justifyContent: 'center', flexDirection: 'row' }}
					onPress={() => navigation.navigate('Crm')}
				>
					<Image source={require('../../assets/goback.png')} style={{ marginLeft: 15 }} />
				</TouchableOpacity>
			</View>
		);
	};

	const ComponentCenter = () => {
		return (
			<View style={{ flex: 1 }}>
				<Text style={styles.titulo}>Editar</Text>
			</View>
		);
	};

	const ComponentRight = () => {
		return (
			<View style={{ flex: 1, alignItems: 'flex-end' }}>
				<TouchableOpacity
					style={{ justifyContent: 'center', flexDirection: 'row' }}
					onPress={() => navigation.navigate('Resumo')}
				>
					<Image
						source={require('../../assets/principal.png')}
						style={{ resizeMode: 'contain', width: 80, height: 35 }}
					/>
				</TouchableOpacity>
			</View>
		);
	};

	// fim navigation

	return (
		<View style={styles.container}>
			<NavigationBar
				componentLeft={() => <ComponentLeft />}
				componentCenter={() => <ComponentCenter />}
				componentRight={() => <ComponentRight />}
				navigationBarStyle={{ backgroundColor: '#C2C2C2' }}
				statusBarStyle={{ barStyle: 'light-content', backgroundColor: '#215e79' }}
			/>
			<View style={styles.card}>
				<Text style={styles.label}>Medicos</Text>
				<Text style={styles.sublabel}>Ultimos Crm Adicionados</Text>
				<ScrollView style={styles.cardCrm}>{renderCrm()}</ScrollView>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#C2C2C2'
	},
	card: {
		// alignSelf: 'stretch',
		marginTop: 10,
		backgroundColor: '#D5D5D5',
		paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
	},
	button: {
		alignSelf: 'center',
		backgroundColor: '#FE4949',
		padding: 8,
		borderRadius: 6,
		fontSize: 20,
		fontWeight: 'bold',
		width: '80%',
		marginTop: 5,
		marginBottom: 5
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
	sublabel: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#383838',
		alignSelf: 'center',
		marginBottom: 10
	},
	labelCrm: {
		fontSize: 16,
		marginTop: 5,
		fontWeight: 'bold'
	},
	cardCrm: {
		width: '80%'
	},
	cardEdit: {
		paddingBottom: 15,
		paddingTop: 15,
		paddingLeft: 5,
		paddingRight: 5,
		// justifyContent: 'center',
		flexDirection: 'row',
		marginLeft: 15,
		borderWidth: 2,
		borderColor: '#1C1C1C'
	}
});
