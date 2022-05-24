import {StyleSheet, ViewStyle} from 'react-native';
import colors from './colors';

interface Styles {
	container: ViewStyle,
	centeredContainer: ViewStyle,
	screenContainer: ViewStyle
}

const globalStyles = StyleSheet.create<Styles>({
	container: {
		flex: 1,
		backgroundColor: colors.white,
	},
	centeredContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colors.white,
	},
	screenContainer: {
		flex: 1,
		backgroundColor: colors.white,
	},
});

export default globalStyles;
