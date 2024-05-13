import React, { useEffect, useState } from 'react';
import { FlatList, Platform, View } from 'react-native';
import { getAllCategories, getItemsByCategory } from '../../api/api';
import CategoriesCard from '../../components/CategoriesCard/CategoriesCard';
import FoodCard from '../../components/FoodCard/FoodCard';
import Title from '../../components/Title/Title';
import { Category, Meal } from '../../interface';
import style from './style';

const Categories = () => {
    const [loading, setLoading] = useState<boolean>(false);
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
                setLoading(true);
                if (categories !== null) {
                    const recipes = await getItemsByCategory(activeCategory);
                    setActiveCategoryRecipes(recipes);
                }
            } catch (error) {
                console.log(error);
                setErrorMsg(true);
            } finally {
                setLoading(false);
            }
        };
        setCategoryItems();
    }, [categories, activeCategory]);

    const handleOnpress = (item: Category) => {
        item?.strCategory ? setActiveCategory(item.strCategory) : '';
    };

    const categoriesCardStyle = {
        marginTop: 21,
        width: '47%',
        height: 200,
        marginRight: '5%',
        backgroundColor: 'lightgray',
        borderRadius: 25,
    };

    return (
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
                                    containerStyle={categoriesCardStyle}
                                    onPress={() => {}}
                                    recipeItem={item}
                                />
                            );
                        }}
                    />
                )}
            </View>
        </View>
    );
};

export default Categories;
