import { BlurView } from '@react-native-community/blur';
import React from 'react';
import { Image, Platform, TouchableOpacity, View } from 'react-native';
import { Meal } from '../../interface';
import Title from '../Title/Title';
import style from './style';

/** CardDetails **/
type CardDetailsProp = {
    recipeItem: Meal;
    isSuggestion: boolean;
};

const CardDetails = ({ recipeItem, isSuggestion }: CardDetailsProp) => {
    if (!isSuggestion) {
        return (
            <View style={style.cardDetails}>
                {recipeItem?.strMeal && (
                    <Title type={3} text={recipeItem.strMeal} color="white" />
                )}
                {recipeItem?.strCategory && recipeItem?.strArea && (
                    <View style={style.cardDetailsSmall}>
                        <Title
                            type={7}
                            text={recipeItem.strCategory}
                            color="lightgray"
                        />
                        <Title
                            type={7}
                            text={recipeItem.strArea}
                            color="lightgray"
                        />
                    </View>
                )}
            </View>
        );
    } else {
        return (
            <View style={style.cardDetails}>
                {recipeItem?.strMeal && (
                    <Title type={6} text={recipeItem.strMeal} color="white" />
                )}
            </View>
        );
    }
};

/** CardInfo **/
type CardInfoProp = {
    recipeItem: Meal;
    isSuggestion: boolean;
};

const CardInfo = ({ recipeItem, isSuggestion }: CardInfoProp) => {
    if (Platform.OS === 'ios') {
        return (
            <BlurView
                blurType={'dark'}
                blurAmount={3}
                style={
                    isSuggestion
                        ? {
                              ...style.cardInfoContainer,
                              ...style.cardInfoSuggestion,
                          }
                        : style.cardInfoContainer
                }>
                <CardDetails
                    recipeItem={recipeItem}
                    isSuggestion={isSuggestion}
                />
            </BlurView>
        );
    } else {
        return (
            <View
                style={
                    isSuggestion
                        ? {
                              ...style.cardInfoContainer,
                              ...style.cardInfoSuggestion,
                              ...style.cardInfoContainerAndroid,
                              ...style.cardInfoContainerSuggestionAndroid,
                          }
                        : {
                              ...style.cardInfoContainer,
                              ...style.cardInfoContainerAndroid,
                          }
                }>
                <CardDetails
                    recipeItem={recipeItem}
                    isSuggestion={isSuggestion}
                />
            </View>
        );
    }
};

/** Food Card **/
type FoodCardProp = {
    containerStyle: any;
    recipeItem: Meal;
    onPress: () => void;
    isSuggestion?: boolean;
};

const FoodCard = ({
    containerStyle,
    recipeItem,
    onPress,
    isSuggestion = false,
}: FoodCardProp) => {
    return (
        <TouchableOpacity onPress={onPress} style={containerStyle}>
            {recipeItem.strMealThumb ? (
                <Image
                    resizeMode={'cover'}
                    style={{
                        ...style.image,
                        borderRadius: containerStyle.borderRadius,
                    }}
                    source={{ uri: recipeItem.strMealThumb }}
                />
            ) : (
                <></>
            )}
            <CardInfo recipeItem={recipeItem} isSuggestion={isSuggestion} />
        </TouchableOpacity>
    );
};

export default FoodCard;
