import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
    container: {
        marginTop: 21,
        width: 205,
        height: 250,
        backgroundColor: 'gray',
        borderRadius: 15,
    },
    image: {
        width: 205,
        height: 250,
        borderRadius: 15,
    },

    // CardInfo Style
    cardInfoContainer: {
        position: 'absolute',
        borderRadius: 8,
        paddingHorizontal: 17,
        paddingVertical: 12,
        height: 69,
        bottom: 10,
        left: 10,
        right: 10,
    },
    cardInfoContainerAndroid: {
        backgroundColor: 'rgba(20,20, 20,0.6)',
    },
    // CardDetails
    cardDetails: {
        alignItems: 'center',
    },
    cardDetailsSmall: {
        marginTop: 15,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default style;
