import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { FlatList, Platform, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import globalStyle from '../../../assets/styles/globalStyle';
import ResultsCard from '../../components/ResultsCard/ResultsCard';
import Title from '../../components/Title/Title';
import { Meal } from '../../interface';
import { AppStackScreens } from '../../navigation/Route';
import {
    AppStackNavigationProp,
    AppStackRouteProp,
} from '../../navigation/navigationTypes';
import style from './style';

export type ResultsProp = {
    recipes: Meal[];
};

const Results = () => {
    const navigation = useNavigation<AppStackNavigationProp>();
    const route = useRoute<AppStackRouteProp<AppStackScreens.SearchResults>>();

    const { recipes } = route.params;

    const handlePress = (item: Meal) => {
        navigation.navigate(AppStackScreens.Details, { recipeItem: item });
    };

    return (
        <SafeAreaView style={[globalStyle.flex, globalStyle.backgroundColor]}>
            <SafeAreaProvider>
                <View style={style.container}>
                    <Title text={'Search Results'} color="#25AE87" />
                    {recipes.length > 0 && (
                        <FlatList
                            contentContainerStyle={
                                Platform.OS === 'ios'
                                    ? style.flatlistBottom
                                    : style.flatlistBottomAndroid
                            }
                            keyExtractor={item => item.idMeal!}
                            showsVerticalScrollIndicator={false}
                            data={recipes}
                            renderItem={({ item }) => {
                                return (
                                    <ResultsCard
                                        key={item.idMeal}
                                        onPress={() => {
                                            handlePress(item);
                                        }}
                                        recipeItem={item}
                                    />
                                );
                            }}
                        />
                    )}
                </View>
            </SafeAreaProvider>
        </SafeAreaView>
    );
};

export default Results;
