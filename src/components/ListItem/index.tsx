import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {CompanyShortDetails} from '../../helpers/types';
import {CompaniesPageNavigationType} from '../../pages/Companies';
import styles from './styles';

interface Props {
  item: CompanyShortDetails,
  index: number
}

const ListItem: React.FC<Props> = ({item, index}) => {
	const navigation = useNavigation<CompaniesPageNavigationType>();
	return (
		<TouchableOpacity onPress={() => navigation.navigate('company', {symbol: item?.symbol})} style={[styles.container, index % 2 === 1 && styles.oddItems]} key={index}>
			<Text style={styles.symbolText}>{item.symbol}</Text>
			<View>
				<Text style={styles.latestPriceText}>${item.latestPrice}</Text>
				<View style={styles.changesContainer}>
					<Text style={[styles.changeText, item?.change < 0 && styles.redText]}>${item?.change}</Text>
					<Text style={[styles.changeText, item?.changePercent < 0 && styles.redText]}>({item?.changePercent.toFixed(2)}%)</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default ListItem;
