import { StyleSheet } from 'react-native';
import { getFontFamily } from '../../../assets/fonts/helper';

const style = StyleSheet.create({
    searchContainer: {
        marginTop: 32,
        backgroundColor: '#EFEFEF',
        borderRadius: 15,
    },
    textInput: {
        padding: 20,
        borderRadius: 15,
        fontFamily: getFontFamily('Inter', '300'),
        fontSize: 14,
    },
});

export default style;
