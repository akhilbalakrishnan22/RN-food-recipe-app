import { StyleSheet } from 'react-native';
import { getFontFamily } from '../../../assets/fonts/helper';

const style = StyleSheet.create({
    searchContainer: {
        marginTop: 32,
        borderRadius: 13,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textInput: {
        flex: 1,
        padding: 18,
        borderRadius: 13,
        fontFamily: getFontFamily('Inter', '400'),
        fontSize: 14,
    },
    searchIcon: {
        marginRight: 10,
    },
});

export default style;
