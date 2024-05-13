import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer: {
        width: '100%',
        backgroundColor: 'lightgray',
        height: '40%',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    contentContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        height: '70%',
        borderStartStartRadius: 20,
        borderStartEndRadius: 20,
        paddingTop: 35,
        paddingHorizontal: 28,
    },
    contentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 10,
    },
    title: {
        width: '90%',
    },
    contentDescription: {
        marginTop: 20,
        gap: 20,
        width: '100%',
    },
    contentIngredients: {
        marginTop: 34,
    },
    ingredientsHeader: {
        flexDirection: 'row',
        gap: 14,
        marginBottom: 31,
    },
    videoContainer: {
        marginTop: 20,
    },
    videoContainerTitle: {
        marginBottom: 20,
    },
});

export default style;
