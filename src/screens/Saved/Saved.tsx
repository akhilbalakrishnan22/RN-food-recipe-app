import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import globalStyle from '../../../assets/styles/globalStyle';
import FoodCard from '../../components/FoodCard/FoodCard';
import Title from '../../components/Title/Title';
import { Meal } from '../../interface';
import style from './style';
import { useNavigation } from '@react-navigation/native';
import { AppStackNavigationProp } from '../../navigation/navigationTypes';
import { AppStackScreens } from '../../navigation/Route';

const Saved = () => {
    const navigation = useNavigation<AppStackNavigationProp>();
    const [savedRecipes, setSavedRecipes] = useState<Meal[]>([]);

    useEffect(() => {
        const fetchSavedMeals = async () => {
            try {
                const savedMeals = await AsyncStorage.getItem('meals');
                if (savedMeals) {
                    const recipes = JSON.parse(savedMeals);
                    setSavedRecipes(recipes.reverse());
                }
            } catch (error) {
                console.error(
                    'Failed to fetch saved meals from storage',
                    error,
                );
            }
        };
        fetchSavedMeals();
    }, [savedRecipes]);

    const savedCardStyle = {
        marginTop: 21,
        width: '47%',
        height: 200,
        marginRight: '5%',
        backgroundColor: 'lightgray',
        borderRadius: 25,
    };
    return (
        <SafeAreaView style={[globalStyle.flex, globalStyle.backgroundColor]}>
            <SafeAreaProvider>
                <View style={style.container}>
                    <Title text="Saved Recipes" color="#25AE87" />
                    <FlatList
                        contentContainerStyle={style.paddingBottom}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={item => item.idMeal!}
                        numColumns={2}
                        data={savedRecipes}
                        renderItem={({ item }) => {
                            return (
                                <FoodCard
                                    onPress={() => {
                                        navigation.navigate(
                                            AppStackScreens.Details,
                                            { recipeItem: item },
                                        );
                                    }}
                                    containerStyle={savedCardStyle}
                                    key={item.idMeal}
                                    recipeItem={item}
                                />
                            );
                        }}
                    />
                </View>
            </SafeAreaProvider>
        </SafeAreaView>
    );
};

export default Saved;
