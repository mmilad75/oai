import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import ListItem from '../../components/ListItem';
import Loader from '../../components/Loader';
import {useIex} from '../../context/IEXProvider';
import {GET_DATA_TIMER} from '../../helpers/constants';
import globalStyles from '../../helpers/globalStyles';
import {CompanyShortDetails} from '../../helpers/types';
import {MainStackParamsList} from '../../navigators';

export type CompaniesPageNavigationType = StackNavigationProp<MainStackParamsList, 'companies'>;

interface Props {
	navigation: CompaniesPageNavigationType
}

const CompaniesPage: React.FC<Props> = ({navigation}) => {
	const [data, setData] = useState<CompanyShortDetails[]>([]);
	const [loading, setLoading] = useState(true);
	const context = useIex();

	useEffect(() => {
		const load = async () => {
			const res = await context.getTopMarketCap();
			setData(JSON.parse(res.data));
		};

		load();
		const intervalID = setInterval(() => {
			load();
		}, GET_DATA_TIMER);

		navigation.addListener('blur', () => {
			clearInterval(intervalID);
		});
	}, []);

	useEffect(() => {
		if (data.length) {
			setLoading(false);
		}
	}, [data]);

	if (loading) {
		return <Loader />;
	}

	return (
		<View style={globalStyles.screenContainer}>
			<FlatList
				data={data}
				renderItem={({item, index}) => <ListItem item={item} index={index} />}
			/>
		</View>
	);
};

export default CompaniesPage;
