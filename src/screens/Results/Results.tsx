import React from 'react';
import { FlatList, Platform, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import globalStyle from '../../../assets/styles/globalStyle';
import ResultsCard from '../../components/ResultsCard/ResultsCard';
import Title from '../../components/Title/Title';
import { Meal } from '../../interface';
import style from './style';

type ResultsProp = {
    recipes: Meal[];
    onPress: () => void;
};

const Results = ({ recipes, onPress }: ResultsProp) => {
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
                                        onPress={onPress}
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
