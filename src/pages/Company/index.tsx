import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import Loader from '../../components/Loader';
import {useIex} from '../../context/IEXProvider';
import globalStyles from '../../helpers/globalStyles';
import {CompanyInfo, CompanyShortDetails} from '../../helpers/types';
import {MainStackParamsList} from '../../navigators';
import styles from './styles';

export type CompanyPageNavigationType = StackNavigationProp<MainStackParamsList, 'company'>;

interface Props {
  route: RouteProp<{ params: { symbol: string } }, 'params'>
  navigation: CompanyPageNavigationType
}

const CompanyPage: React.FC<Props> = ({navigation, route}) => {
	const {symbol} = route.params;
	const [data, setData] = useState<CompanyShortDetails | null>(null);
	const [companyData, setCompanyData] = useState<CompanyInfo | null>();
	const [loading, setLoading] = useState(true);
	const context = useIex();

	useEffect(() => {
		const loadStaticData = async () => {
			const res = await context.getCompany(symbol);
			setCompanyData(JSON.parse(res.data));
		};

		const loadDynamicData = async () => {
			const res = await context.getQuote(symbol);
			setData(JSON.parse(res.data));
		};

		loadStaticData();
		const intervalID = setInterval(() => {
			loadDynamicData();
		}, 5000);

		navigation.addListener('blur', () => {
			clearInterval(intervalID);
		});
	}, []);

	useEffect(() => {
		if (data && companyData) {
			setLoading(false);
		}
	}, [data, companyData]);

	if (loading) {
		return <Loader />;
	}

	return (
		<View style={[globalStyles.screenContainer, styles.container]}>
			<View style={styles.header}>
				<Text style={styles.title}>{companyData?.companyName}</Text>
				<Text style={styles.symbol}>{data?.symbol}</Text>
			</View>
			<Text style={styles.subtitle}>${data?.latestPrice}</Text>
			<Text style={[styles.description, data?.change && data.change < 0 ? styles.redText : null]}>{`$${data?.change} (${data?.changePercent})%`}</Text>

			<Text style={styles.key}>1YR Change</Text>
			<Text style={[styles.value, data?.ytdChange && data.ytdChange > 0 ? styles.greenText : styles.redText]}>{`$17.34 (${data?.ytdChange && data?.ytdChange.toFixed(2)}%)`}</Text>

			<Text style={styles.key}>CEO</Text>
			<Text style={styles.value}>{companyData?.CEO}</Text>

			<Text style={styles.key}>INDUSTRY</Text>
			<Text style={styles.value}>{companyData?.industry}</Text>

			<Text style={styles.key}>EMPLOYEES</Text>
			<Text style={styles.value}>{companyData?.employees}</Text>
		</View>
	);
};

export default CompanyPage;
