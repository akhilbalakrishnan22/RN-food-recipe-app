import { StyleSheet } from 'react-native';
import { getFontFamily } from '../../../assets/fonts/helper';

const style = StyleSheet.create({
    text: {
        textAlign: 'center',
        color: 'white',
        fontFamily: getFontFamily('Inter', '700'),
        fontSize: 20,
    },
});

export default style;
