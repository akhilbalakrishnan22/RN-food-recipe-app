import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import { Category } from '../../interface';
import Title from '../Title/Title';
import style from './style';

type CategoriesCardProp = {
    category: Category;
    activeCategory?: string;
    onPress: (item: Category) => void;
    isLoading: boolean;
};

const CategoriesCard = ({
    category,
    activeCategory,
    onPress,
    isLoading,
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
                    <ShimmerPlaceholder
                        style={style.image}
                        visible={!isLoading}
                        LinearGradient={LinearGradient}>
                        <Image
                            style={style.image}
                            resizeMode={'cover'}
                            source={{ uri: category.strCategoryThumb }}
                        />
                    </ShimmerPlaceholder>
                </View>
            )}
            {category?.strCategory && (
                <Title type={5} text={category.strCategory} color="black" />
            )}
        </TouchableOpacity>
    );
};

export default CategoriesCard;
