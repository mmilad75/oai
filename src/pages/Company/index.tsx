import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import Loader from '../../components/Loader';
import {useIex} from '../../context/IEXProvider';
import {GET_DATA_TIMER} from '../../helpers/constants';
import {showChangeInDollar} from '../../helpers/functions';
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
	const [firstPrice, setFirstPrice] = useState<number>(0);
	const [loading, setLoading] = useState(true);
	const [isChangePositive, setIsChangePositive] = useState<boolean>();
	const context = useIex();

	useEffect(() => {
		const loadStaticData = async () => {
			const res = await context.getCompany(symbol);
			const firstPrices = await context.getHistoricalPrices(symbol);
			setCompanyData(JSON.parse(res.data));
			setFirstPrice(JSON.parse(firstPrices.data)[0].close);
		};

		const loadDynamicData = async () => {
			const res = await context.getQuote(symbol);
			setData(JSON.parse(res.data));
		};

		loadStaticData();
		loadDynamicData();

		const intervalID = setInterval(() => {
			loadDynamicData();
		}, GET_DATA_TIMER);

		navigation.addListener('blur', () => {
			clearInterval(intervalID);
		});
	}, []);

	useEffect(() => {
		if (firstPrice && data) {
			setIsChangePositive(data.latestPrice > firstPrice);
		}
	}, [firstPrice, data]);

	useEffect(() => {
		if (data && companyData) {
			setLoading(false);
		}
	}, [data, companyData]);

	const calculateYearChange = () => {
		if (data?.latestPrice !== undefined) {
			const result = data.latestPrice - firstPrice;
			return showChangeInDollar(result);
		}

		return 0;
	};

	const calculateYearChangePercentage = () => {
		if (data?.latestPrice !== undefined) {
			const result = ((data.latestPrice - firstPrice) / Math.abs(firstPrice)) * 100;
			return `${result.toFixed(2)}%`;
		}

		return 0;
	};

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
			<Text style={[styles.description, data?.change && data.change < 0 ? styles.redText : null]}>{`${showChangeInDollar(data?.change ? data.change : 0)} (${data?.changePercent.toFixed(2)}%)`}</Text>

			<Text style={styles.key}>1YR Change</Text>
			<Text style={[styles.value, isChangePositive ? styles.greenText : styles.redText]}>{`${calculateYearChange()} (${calculateYearChangePercentage()})`}</Text>

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
