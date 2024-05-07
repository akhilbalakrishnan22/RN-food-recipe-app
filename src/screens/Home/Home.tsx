import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import {
    getItemById,
    getItemsByLocation,
    getSuggestedItemAndArea,
} from '../../api/api';
import FoodCard from '../../components/FoodCard/FoodCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import Title from '../../components/Title/Title';
import { Location, Meal } from '../../interface';
import style from './style';

const Home = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [suggestedMeal, setSuggestedMeal] = useState<Meal[]>([]);
    const [locations, setLocations] = useState<Location[]>([]);
    const [errorMsg, setErrorMsg] = useState<boolean>(false);
    const [trendingFoods, setTrendingFoods] = useState<Meal[]>([]);

    useEffect(() => {
        const getSuggestedMeal = async () => {
            try {
                setLoading(true);
                const { suggestedItem, areaList } =
                    await getSuggestedItemAndArea();
                setSuggestedMeal(suggestedItem);
                setLocations(areaList);
            } catch (error) {
                console.log(error);
                setErrorMsg(true);
            } finally {
                setLoading(false);
            }
        };
        getSuggestedMeal();
    }, []);

    useEffect(() => {
        const locationArray = locations?.map(location => location.strArea);
        const randomLocation = Math.floor(
            Math.random() * locationArray?.length,
        );
        const getTrending = async (location: string) => {
            try {
                setLoading(true);
                const trending: Meal[] = await getItemsByLocation(location);
                trending?.forEach(async item => {
                    if (typeof item?.idMeal === 'string' && item.idMeal) {
                        const foodList = await getItemById(
                            parseInt(item.idMeal, 10),
                        );
                        if (foodList.length) {
                            setTrendingFoods(prevState => [
                                ...prevState,
                                foodList[0],
                            ]);
                        }
                    }
                });
            } catch (error) {
                console.log(error);
                setErrorMsg(true);
            } finally {
                setLoading(false);
            }
        };
        getTrending(locationArray[randomLocation]);
    }, [locations]);

    const trendingCardStyle = {
        marginTop: 21,
        marginRight: 31,
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
            {suggestedMeal?.length > 0 && !errorMsg && (
                <View style={style.suggestion}>
                    <Title type={2} text={'Just For You'} color={'black'} />
                    <FoodCard
                        isSuggestion={true}
                        containerStyle={suggestedCardStyle}
                        recipeItem={suggestedMeal[0]}
                        onPress={() => {}}
                    />
                </View>
            )}

            {trendingFoods.length > 0 && !errorMsg && (
                <View style={style.trendingContainer}>
                    <Title type={2} text={'Trending Recipes'} color={'black'} />
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={trendingFoods}
                        renderItem={({ item }) => {
                            return (
                                <FoodCard
                                    containerStyle={trendingCardStyle}
                                    recipeItem={item}
                                    onPress={() => {}}
                                />
                            );
                        }}
                    />
                </View>
            )}
        </View>
    );
};

export default Home;
