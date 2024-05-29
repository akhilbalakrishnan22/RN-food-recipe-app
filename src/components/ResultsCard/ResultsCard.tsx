import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Meal } from '../../interface';
import Title from '../Title/Title';
import style from './style';

type ResultsCardProp = {
    recipeItem: Meal;
    onPress: () => void;
};

const ResultsCard = ({ recipeItem, onPress }: ResultsCardProp) => {
    const { colors } = useTheme();
    return (
        <TouchableOpacity
            style={{ ...style.container, backgroundColor: colors.background }}
            onPress={onPress}>
            {recipeItem.strMealThumb ? (
                <View style={style.imageContainer}>
                    <Image
                        style={style.image}
                        resizeMode={'cover'}
                        source={{ uri: recipeItem.strMealThumb }}
                    />
                </View>
            ) : (
                <></>
            )}

            <View style={style.detailsContainer}>
                {recipeItem?.strMeal && (
                    <Title
                        type={6}
                        text={recipeItem.strMeal}
                        color={colors.text}
                    />
                )}
                {recipeItem?.strCategory ? (
                    <Title
                        type={5}
                        text={`Category: ${recipeItem.strCategory}`}
                        color={colors.text}
                    />
                ) : (
                    <></>
                )}
                {recipeItem?.strArea ? (
                    <Title
                        type={5}
                        text={`Location: ${recipeItem.strArea}`}
                        color={colors.text}
                    />
                ) : (
                    <></>
                )}
            </View>
        </TouchableOpacity>
    );
};

export default ResultsCard;
