import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');
const layoutWidth = width < 480
	? 375 : width < 720
		? 480 : width < 960
			? 720 : width < 1280
				? 960 : width * 0.8;

const scaleW = (size: number) => (width / layoutWidth) * size;

export {
	width,
	height,
	scaleW,
};
