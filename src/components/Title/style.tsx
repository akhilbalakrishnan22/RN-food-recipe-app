import { StyleSheet } from 'react-native';
import { getFontFamily } from '../../../assets/fonts/helper';

const style = StyleSheet.create({
    title1: {
        fontFamily: getFontFamily('Inter', '700'),
        fontSize: 28,
    },
    title2: {
        fontFamily: getFontFamily('Inter', '600'),
        fontSize: 22,
    },
    title3: {
        fontFamily: getFontFamily('Inter', '600'),
        fontSize: 14,
    },
    title4: {
        fontFamily: getFontFamily('Inter', '600'),
        fontSize: 12,
    },
    title5: {
        fontFamily: getFontFamily('Inter', '400'),
        fontSize: 16,
    },
    title6: {
        fontFamily: getFontFamily('Inter', '600'),
        fontSize: 18,
    },
});

export default style;
