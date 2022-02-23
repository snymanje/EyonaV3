import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const DeliveryDetailsScreen = () => {
	return (
		<View style={styles.screen}>
			<Text>My Deliveries</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center',
	},
});
