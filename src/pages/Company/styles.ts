import {StyleSheet} from 'react-native';
import colors from '../../helpers/colors';
import {scaleW} from '../../helpers/device';

export default StyleSheet.create({
	container: {
		padding: scaleW(20),
	},
	title: {
		fontSize: scaleW(26),
		fontWeight: '700',
		marginBottom: scaleW(24),
	},
	subtitle: {
		fontSize: scaleW(20),
		fontWeight: '700',
		color: colors.green,
	},
	description: {
		fontSize: scaleW(14),
		color: colors.green,
		marginBottom: scaleW(50),
	},
	key: {
		color: colors.darkGray,
		fontSize: scaleW(16),
		marginBottom: scaleW(6),
	},
	value: {
		fontSize: scaleW(18),
		fontWeight: '700',
		marginBottom: scaleW(30),
	},
	greenText: {
		color: colors.green,
	},
	redText: {
		color: colors.red,
	},
	symbol: {
		color: colors.darkGray,
		fontSize: scaleW(20),
		fontWeight: '700',
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
	},
});
