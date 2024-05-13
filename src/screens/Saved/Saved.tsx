import React from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import globalStyle from '../../../assets/styles/globalStyle';
import FoodCard from '../../components/FoodCard/FoodCard';
import Title from '../../components/Title/Title';
import { Meal } from '../../interface';
import style from './style';

type SavedProp = {
    recipes: Meal[];
};

const Saved = ({ recipes }: SavedProp) => {
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
                        data={recipes}
                        renderItem={({ item }) => {
                            return (
                                <FoodCard
                                    onPress={() => {}}
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
