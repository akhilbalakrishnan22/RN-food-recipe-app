import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import globalStyle from '../../../assets/styles/globalStyle';
import FoodCard from '../../components/FoodCard/FoodCard';
import Title from '../../components/Title/Title';
import { Meal } from '../../interface';
import { AppStackScreens } from '../../navigation/Route';
import { AppStackNavigationProp } from '../../navigation/navigationTypes';
import style from './style';

const Saved = () => {
    const navigation = useNavigation<AppStackNavigationProp>();
    const [savedRecipes, setSavedRecipes] = useState<Meal[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchSavedMeals = async () => {
        try {
            setLoading(true);
            const savedMeals = await AsyncStorage.getItem('meals');
            if (savedMeals) {
                const recipes = JSON.parse(savedMeals);
                setSavedRecipes(recipes.reverse());
            }
        } catch (error) {
            console.error('Failed to fetch saved meals from storage', error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchSavedMeals();
        }, []),
    );

    const savedCardStyle = {
        marginTop: 21,
        width: '47%',
        height: 200,
        marginRight: '5%',
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
                                    isLoading={loading}
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
