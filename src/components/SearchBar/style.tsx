import { StyleSheet } from 'react-native';
import { getFontFamily } from '../../../assets/fonts/helper';

const style = StyleSheet.create({
    searchContainer: {
        marginTop: 32,
        backgroundColor: '#E7E7E7',
        borderRadius: 13,
    },
    textInput: {
        padding: 18,
        borderRadius: 13,
        fontFamily: getFontFamily('Inter', '400'),
        fontSize: 14,
        color: '#6B6B6B',
    },
});

export default style;
