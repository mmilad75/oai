import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView} from 'react-native';
import {
	createStackNavigator,
	StackNavigationProp,
} from '@react-navigation/stack';
import CompaniesPage from '../pages/Companies';
import CompanyPage from '../pages/Company';
import globalStyles from '../helpers/globalStyles';

export type MainStackParamsList = {
  companies: undefined;
  company: {
		symbol: string | undefined
	};
};

export type mainStackNavigationType = StackNavigationProp<MainStackParamsList>;
const MainStack = createStackNavigator<MainStackParamsList>();

const Index: React.FC = () => (
	<SafeAreaView style={globalStyles.container}>
		<NavigationContainer>
			<MainStack.Navigator screenOptions={{headerShown: false}}>
				<MainStack.Screen name='companies' component={CompaniesPage} />
				<MainStack.Screen name='company' component={CompanyPage} />
			</MainStack.Navigator>
		</NavigationContainer>
	</SafeAreaView>
);

export default Index;
