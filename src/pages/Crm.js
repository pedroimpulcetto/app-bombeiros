import React, { useState, useEffect } from 'react';
import {
	Text,
	SafeAreaView,
	StyleSheet,
	Image,
	View,
	ScrollView,
	TextInput,
	Button,
	TouchableOpacity,
	Platform,
	StatusBar
} from 'react-native';
import api from '../services/api.js';
import { NavigationBar } from 'navigationbar-react-native';

export default function Crm({ navigation }) {
	const [ num, setNum ] = useState(0);
	const [ nome, setNome ] = useState('');

	async function handleSubmit(crm) {
		if (crm.id) {
			await api.put(`crm/${crm.id}`, crm);
		}
		await api.post('crm/', {
			crm_crm: num,
			nome_medico_crm: nome
		});

		navigation.navigate('Resumo');
	}

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
				<Text style={styles.titulo}>Adicionar Crm</Text>
			</View>
		);
	};

	const ComponentRight = () => {
		return (
			<View style={{ flex: 1, alignItems: 'flex-end' }}>
				<TouchableOpacity onPress={() => navigation.navigate('EditCrm')}>
					<Image
						source={require('../../assets/medical.png')}
						style={{ resizeMode: 'contain', width: 80, height: 35, alignSelf: 'flex-end' }}
					/>
				</TouchableOpacity>
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
					statusBarStyle={{ barStyle: 'light-content', backgroundColor: '#215e79' }}
				/>
			</View>
			<View style={styles.form}>
				<Text style={styles.label}>Numero do CRM</Text>
				<TextInput
					style={styles.input}
					placeholder="Digite o Numero do CRM.."
					keyboardType="numeric"
					name="num"
					value={num}
					onChangeText={setNum}
				/>
			</View>
			<View style={styles.form}>
				<Text style={styles.label}>Nome do Medico</Text>
				<TextInput
					style={styles.input}
					placeholder="Digite o Nome do Medico"
					autoCapitalize="words"
					name="nome"
					value={nome}
					onChangeText={setNome}
				/>
				<TouchableOpacity style={styles.button} onPress={handleSubmit}>
					<Text style={{ color: 'white', fontSize: 18 }}>Adicionar</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#C2C2C2',
		paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
	},
	titulo: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#FE4949'
	},
	form: {
		alignSelf: 'stretch',
		paddingHorizontal: 30,
		marginTop: 20
	},
	label: {
		fontWeight: 'bold',
		color: '#444',
		marginBottom: 16
	},
	input: {
		borderWidth: 1,
		borderColor: '#ddd',
		paddingHorizontal: 20,
		fontSize: 16,
		height: 44,
		marginBottom: 10,
		borderRadius: 4,
		backgroundColor: '#F1F1F1'
	},
	button: {
		alignItems: 'center',
		backgroundColor: '#FE4949',
		padding: 20,
		borderRadius: 6,
		fontSize: 20,
		fontWeight: 'bold'
	}
});
