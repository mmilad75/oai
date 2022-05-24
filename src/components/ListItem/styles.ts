import {StyleSheet} from 'react-native';
import {scaleW} from '../../helpers/device';

export default StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: scaleW(20),
		paddingHorizontal: scaleW(30),
	},
	oddItems: {
		backgroundColor: '#f4f4f4',
	},
	changesContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	symbolText: {
		fontSize: scaleW(20),
		fontWeight: '800',
		alignSelf: 'center',
	},
	latestPriceText: {
		fontSize: scaleW(18),
		fontWeight: '600',
		color: 'green',
		textAlign: 'right',
		marginBottom: scaleW(10),
	},
	changeText: {
		marginLeft: scaleW(8),
		color: 'green',
		fontSize: scaleW(14),
	},
	redText: {
		color: 'red',
	},
});
