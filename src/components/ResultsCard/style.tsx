import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
    container: {
        marginTop: 20,
        height: 126,
        flexDirection: 'row',
        borderColor: '#25AE87',
        borderBottomWidth: 3,
        borderRightWidth: 3,
        borderRadius: 15,
        alignItems: 'center',
    },
    imageContainer: {
        width: 126,
        height: '100%',
        marginEnd: 8,
        borderRadius: 12,
        padding: 3,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 12,
    },
    detailsContainer: {
        borderRadius: 12,
        flex: 1,
        minHeight: '100%',
        gap: 6,
        paddingHorizontal: 3,
        paddingVertical: 20,
        marginEnd: 3,
    },
});

export default style;
