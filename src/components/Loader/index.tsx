import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import colors from '../../helpers/colors';
import globalStyles from '../../helpers/globalStyles';

const Loader: React.FC = () => (
	<View style={globalStyles.centeredContainer}>
		<ActivityIndicator size='small' color={colors.black} />
	</View>
);

export default Loader;
