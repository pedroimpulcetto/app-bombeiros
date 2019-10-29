import React from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

export default function DetailTalao({ icon, descricao, valor }) {
	return (
		<View style={styles.container}>
			{/* <Icon name={icon} size={18} style={{ marginRight: 5 }} /> */}
			<Text style={styles.descricao}>{descricao}</Text>
			<Text style={styles.valor}>{valor}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row'
	},
	descricao: {
		fontSize: 22
	},
	valor: {
		fontSize: 20,
		fontWeight: 'bold'
	}
});
