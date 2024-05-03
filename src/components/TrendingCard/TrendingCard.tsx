import { BlurView } from '@react-native-community/blur';
import React from 'react';
import {
    Image,
    Platform,
    StyleProp,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import style from './style';
import Title from '../Title/Title';

const CardDetails = () => {
    return (
        <View style={style.cardDetails}>
            <Title type={3} text="Salmon Sushi Recipe" color="white" />
            <View style={style.cardDetailsSmall}>
                <Title type={7} text="Beef" color="lightgray" />
                <Title type={7} text="Jamaican" color="lightgray" />
            </View>
        </View>
    );
};

/** CardInfo **/
type CardInfoProp = {
    recipeItem: string;
};

const CardInfo = ({ recipeItem }: CardInfoProp) => {
    if (Platform.OS === 'ios') {
        return (
            <BlurView blurType={'dark'} style={style.cardInfoContainer}>
                <CardDetails />
            </BlurView>
        );
    } else {
        return (
            <View
                style={[
                    style.cardInfoContainer,
                    style.cardInfoContainerAndroid,
                ]}>
                <CardDetails />
            </View>
        );
    }
};

/** Trending Card **/
type TrendingCardProp = {
    containerStyle: StyleProp<ViewStyle>;
    recipeItem: string;
    onPress: () => void;
};

const TrendingCard = ({
    containerStyle,
    recipeItem,
    onPress,
}: TrendingCardProp) => {
    return (
        <TouchableOpacity onPress={onPress} style={style.container}>
            <Image
                resizeMode={'cover'}
                style={style.image}
                source={{
                    uri: 'https://restaurantden.wpenginepowered.com/wp-content/uploads/2017/09/free-stock-food-photography-websites.jpg',
                }}
            />
            <CardInfo recipeItem={recipeItem} />
        </TouchableOpacity>
    );
};

export default TrendingCard;
