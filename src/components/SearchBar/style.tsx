import { StyleSheet } from 'react-native';
import { getFontFamily } from '../../../assets/fonts/helper';

const style = StyleSheet.create({
    searchContainer: {
        marginTop: 32,
        backgroundColor: '#EFEFEF',
        borderRadius: 13,
    },
    textInput: {
        padding: 18,
        borderRadius: 13,
        fontFamily: getFontFamily('Inter', '300'),
        fontSize: 14,
    },
});

export default style;
