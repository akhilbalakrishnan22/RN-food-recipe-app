import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Category } from '../../interface';
import Title from '../Title/Title';
import style from './style';

type CategoriesCardProp = {
    category: Category;
    activeCategory?: string;
    onPress: (item: Category) => void;
};

const CategoriesCard = ({
    category,
    activeCategory,
    onPress,
}: CategoriesCardProp) => {
    return (
        <TouchableOpacity
            style={style.container}
            onPress={() => onPress(category)}>
            {category?.strCategoryThumb && (
                <View
                    style={
                        activeCategory === category.strCategory
                            ? {
                                  ...style.imageContainer,
                                  ...{ backgroundColor: '#25AE87' },
                              }
                            : style.imageContainer
                    }>
                    <Image
                        style={style.image}
                        resizeMode={'cover'}
                        source={{ uri: category.strCategoryThumb }}
                    />
                </View>
            )}
            {category?.strCategory && (
                <Title type={5} text={category.strCategory} color="black" />
            )}
        </TouchableOpacity>
    );
};

export default CategoriesCard;
