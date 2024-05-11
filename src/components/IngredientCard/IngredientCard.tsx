import React from 'react';
import { Platform, View } from 'react-native';
import { Ingredient } from '../../interface';
import Title from '../Title/Title';
import style from './style';

type IngredientCardProp = {
    item: Ingredient;
};

const IngredientCard = ({ item }: IngredientCardProp) => {
    const generateBoxShadowStyle = (
        xOffset: number,
        yOffset: number,
        shadowColorIos: string,
        shadowOpacity: number,
        shadowRadius: number,
        elevation: number,
        shadowColorAndroid: string,
    ) => {
        if (Platform.OS === 'ios') {
            return {
                shadowColor: shadowColorIos,
                shadowOffset: { width: xOffset, height: yOffset },
                shadowOpacity,
                shadowRadius,
            };
        } else if (Platform.OS === 'android') {
            return {
                elevation,
                shadowColor: shadowColorAndroid,
            };
        }
    };
    const shadowProp = generateBoxShadowStyle(
        0,
        2,
        'rgba(0,0,0,0.5)',
        0.2,
        3,
        4,
        '#rgba(0,0,0,0.5)',
    );
    return (
        <View style={[style.container, shadowProp]}>
            {item.ingredient.strIngredient && (
                <Title
                    type={6}
                    text={item.ingredient.strIngredient}
                    color="black"
                />
            )}
            {item.ingredient.strMeasure && (
                <Title
                    type={6}
                    text={item.ingredient.strMeasure}
                    color="black"
                />
            )}
        </View>
    );
};

export default IngredientCard;
