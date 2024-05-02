import { StyleSheet } from 'react-native';
import { getFontFamily } from '../../../assets/fonts/helper';

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    header: {
        height: '70%', // >700 ? 65:60
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    gradientShade: {
        height: 200,
        justifyContent: 'flex-end',
        paddingHorizontal: 24,
    },
    title: {
        fontFamily: getFontFamily('Inter', '700'),
        fontSize: 35,
        color: 'white',
        textAlign: 'center',
    },
    details: {
        flex: 1,
        paddingHorizontal: 24,
    },
    description: {
        fontFamily: getFontFamily('Inter', '400'),
        fontSize: 12,
        marginTop: 17,
        color: '#777777',
        textAlign: 'center',
    },
});

export default style;
