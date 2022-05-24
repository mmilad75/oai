import React from 'react';
import 'react-native-gesture-handler';
import IEXProvider from './src/context/IEXProvider';
import Index from './src/navigators';

function App() {
	return (
		<IEXProvider>
			<Index />
		</IEXProvider>
	);
}

export default App;
