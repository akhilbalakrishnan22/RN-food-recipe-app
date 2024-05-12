import React from 'react';
import { FlatList, Platform, View } from 'react-native';
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
    );
};

export default Results;
