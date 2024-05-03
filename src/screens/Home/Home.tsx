import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import getSuggestedItem from '../../api/api';
import SearchBar from '../../components/SearchBar/SearchBar';
import Title from '../../components/Title/Title';
import { Meal } from '../../interface';
import style from './style';
import FoodCard from '../../components/FoodCard/FoodCard';

const Home = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [suggestedMeal, setSuggestedMeal] = useState<Meal>();
    const [errorMsg, setErrorMsg] = useState<boolean>(false);

    useEffect(() => {
        const getSuggestedMeal = async () => {
            try {
                setLoading(true);
                const data: Meal = await getSuggestedItem();
                setSuggestedMeal(data);
            } catch (error) {
                setErrorMsg(true);
            } finally {
                setLoading(false);
            }
        };
        getSuggestedMeal();
    }, []);

    const trendingCardStyle = {
        marginTop: 21,
        width: 205,
        height: 250,
        backgroundColor: 'lightgray',
        borderRadius: 15,
    };

    const suggestedCardStyle = {
        marginTop: 19,
        height: 153,
        borderRadius: 15,
        backgroundColor: 'lightgray',
    };

    return (
        <View style={style.container}>
            <Title type={1} text={'Discover Best Recipes'} color={'#25AE87'} />
            <SearchBar />
            {suggestedMeal !== undefined &&
                !errorMsg &&
                Object.keys(suggestedMeal).length && (
                    <View style={style.suggestion}>
                        <Title type={2} text={'Just For You'} color={'black'} />
                        <FoodCard
                            isSuggestion={true}
                            containerStyle={suggestedCardStyle}
                            recipeItem={suggestedMeal}
                            onPress={() => {}}
                        />
                    </View>
                )}

            {suggestedMeal !== undefined &&
                !errorMsg &&
                Object.keys(suggestedMeal).length && (
                    <View style={style.trendingContainer}>
                        <Title
                            type={2}
                            text={'Trending Recipes'}
                            color={'black'}
                        />
                        <FoodCard
                            containerStyle={trendingCardStyle}
                            recipeItem={suggestedMeal}
                            onPress={() => {}}
                        />
                        {/* <FlatList
                            data={}
                            horizontal={true}
                            renderItem={({ item }) => {
                                <TrendingCard
                                    containerStyle={trendingCardStyle}
                                    recipeItem={item}
                                    onPress={() => {}}
                                />;
                            }}
                        /> */}
                    </View>
                )}
        </View>
    );
};

export default Home;
