import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Platform, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import globalStyle from '../../../assets/styles/globalStyle';
import {
    getAllCategories,
    getItemById,
    getItemsByCategory,
} from '../../api/api';
import CategoriesCard from '../../components/CategoriesCard/CategoriesCard';
import FoodCard from '../../components/FoodCard/FoodCard';
import Title from '../../components/Title/Title';
import { Category, Meal } from '../../interface';
import { AppStackScreens } from '../../navigation/Route';
import { AppStackNavigationProp } from '../../navigation/navigationTypes';
import style from './style';

const Categories = () => {
    const navigation = useNavigation<AppStackNavigationProp>();

    const [loading, setLoading] = useState<boolean>(true);
    const [recipesLoading, setRecipesLoading] = useState<boolean>(true);

    const [categories, setCategories] = useState<Category[]>([]);
    const [errorMsg, setErrorMsg] = useState<boolean>(false);
    const [activeCategory, setActiveCategory] = useState<string>('');
    const [activeCategoryRecipes, setActiveCategoryRecipes] = useState<Meal[]>(
        [],
    );

    useEffect(() => {
        const getCategories = async () => {
            try {
                setLoading(true);
                const categoriesList = await getAllCategories();
                if (
                    categoriesList !== null &&
                    categoriesList.length > 0 &&
                    categoriesList[0].strCategory !== null
                ) {
                    setCategories(categoriesList);
                    // Set default active category
                    setActiveCategory(categoriesList[0].strCategory);
                }
            } catch (error) {
                console.log(error);
                setErrorMsg(true);
            } finally {
                setLoading(false);
            }
        };
        getCategories();
    }, []);

    useEffect(() => {
        const setCategoryItems = async () => {
            try {
                setRecipesLoading(true);
                if (categories !== null) {
                    const recipes = await getItemsByCategory(activeCategory);
                    setActiveCategoryRecipes(recipes);
                }
            } catch (error) {
                console.log(error);
                setErrorMsg(true);
            } finally {
                setRecipesLoading(false);
            }
        };
        setCategoryItems();
    }, [categories, activeCategory]);

    const handleOnpress = (item: Category) => {
        setActiveCategoryRecipes([]);
        item?.strCategory ? setActiveCategory(item.strCategory) : '';
    };

    const navigateToDetails = async (item: Meal) => {
        if (item.idMeal !== null) {
            const meal: Meal[] = await getItemById(parseInt(item.idMeal, 10));
            if (meal !== null && meal !== undefined) {
                navigation.navigate(AppStackScreens.Details, {
                    recipeItem: meal[0],
                });
            }
        }
    };

    const categoriesCardStyle = {
        marginTop: 21,
        width: '47%',
        height: 200,
        marginRight: '5%',
        borderRadius: 25,
    };

    const { colors } = useTheme();

    return (
        <SafeAreaView
            style={{ ...globalStyle.flex, backgroundColor: colors.card }}>
            <SafeAreaProvider>
                <View style={style.container}>
                    <View>
                        <Title text="Categories" color="#25AE87" />
                        {categories.length > 0 && !errorMsg && (
                            <FlatList
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                style={style.categoriesContainer}
                                keyExtractor={item => item.idCategory!}
                                data={categories}
                                renderItem={({ item }) => {
                                    return (
                                        <CategoriesCard
                                            isLoading={loading}
                                            key={item.idCategory}
                                            activeCategory={activeCategory}
                                            onPress={category => {
                                                handleOnpress(category);
                                            }}
                                            category={item}
                                        />
                                    );
                                }}
                            />
                        )}
                    </View>

                    <View style={style.scrollView}>
                        {activeCategoryRecipes !== null && !errorMsg && (
                            <FlatList
                                contentContainerStyle={
                                    Platform.OS === 'ios'
                                        ? style.paddingBottom
                                        : style.paddingBottomAndroid
                                }
                                numColumns={2}
                                showsVerticalScrollIndicator={false}
                                data={activeCategoryRecipes}
                                renderItem={({ item }) => {
                                    return (
                                        <FoodCard
                                            isLoading={recipesLoading}
                                            containerStyle={categoriesCardStyle}
                                            onPress={() =>
                                                navigateToDetails(item)
                                            }
                                            recipeItem={item}
                                        />
                                    );
                                }}
                            />
                        )}
                    </View>
                </View>
            </SafeAreaProvider>
        </SafeAreaView>
    );
};

export default Categories;
