import { useTheme } from '@react-navigation/native';
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
    const { colors } = useTheme();
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
                                  ...{
                                      backgroundColor: '#25AE87',
                                      borderColor: colors.border,
                                  },
                              }
                            : {
                                  ...style.imageContainer,
                                  ...{
                                      backgroundColor: colors.card,
                                      borderColor: colors.border,
                                  },
                              }
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
                <Title
                    type={5}
                    text={category.strCategory}
                    color={colors.text}
                />
            )}
        </TouchableOpacity>
    );
};

export default CategoriesCard;
