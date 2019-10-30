import React from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';

export default function DetailTalao({ descricao, valor }) {
	return (
		<View style={styles.container}>
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
