import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
    },

    // CardInfo Style
    cardInfoContainer: {
        position: 'absolute',
        borderRadius: 8,
        paddingHorizontal: 17,
        paddingVertical: 12,
        minHeight: 69,
        bottom: 10,
        left: 10,
        right: 10,
    },

    // CardInfo Style for suggestion
    cardInfoSuggestion: {
        bottom: 0,
        left: 0,
        right: 0,
        minHeight: 50,
    },
    // cardInfoContainer Android Specific
    cardInfoContainerAndroid: {
        backgroundColor: 'rgba(20,20, 20,0.6)',
    },
    cardInfoContainerSuggestionAndroid: {
        borderRadius: 15,
    },

    // CardDetails
    cardDetails: {
        alignItems: 'flex-start',
    },
    cardDetailsSmall: {
        marginTop: 15,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default style;
