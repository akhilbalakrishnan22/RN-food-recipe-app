import { useTheme } from '@react-navigation/native';
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

    const { colors } = useTheme();
    return (
        <View
            style={{
                ...style.container,
                backgroundColor: colors.background,
                ...shadowProp,
            }}>
            {item.ingredient.strIngredient && (
                <Title
                    type={6}
                    text={item.ingredient.strIngredient}
                    color={colors.text}
                />
            )}
            {item.ingredient.strMeasure && (
                <Title
                    type={6}
                    text={item.ingredient.strMeasure}
                    color={colors.text}
                />
            )}
        </View>
    );
};

export default IngredientCard;
