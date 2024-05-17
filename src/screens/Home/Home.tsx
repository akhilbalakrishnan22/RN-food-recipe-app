import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import globalStyle from '../../../assets/styles/globalStyle';
import {
    getItemById,
    getItemsByLocation,
    getItemsByName,
    getSuggestedItemAndArea,
} from '../../api/api';
import FoodCard from '../../components/FoodCard/FoodCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import Title from '../../components/Title/Title';
import { Location, Meal } from '../../interface';
import { AppStackScreens } from '../../navigation/Route';
import { AppStackNavigationProp } from '../../navigation/navigationTypes';
import style from './style';

const Home = () => {
    const navigation = useNavigation<AppStackNavigationProp>();

    const [loading, setLoading] = useState<boolean>(false);
    const [suggestedMeal, setSuggestedMeal] = useState<Meal[]>([]);
    const [locations, setLocations] = useState<Location[]>([]);
    const [errorMsg, setErrorMsg] = useState<boolean>(false);
    const [trendingFoods, setTrendingFoods] = useState<Meal[]>([]);
    const [textInput, setTextInput] = useState<string>('');
    const [searchResults, setSearchResults] = useState<Meal[]>([]);
    const [isReadyToNavigate, setIsReadyToNavigate] = useState<boolean>(false);

    const handleSearchInput = (query: string) => {
        setTextInput(query);
    };

    // API call for searching food by name and ingredient
    const handleSearchRequest = () => {
        const searchItemByNameAndIngredient = async (query: string) => {
            try {
                if (query.length > 0) {
                    setLoading(true);
                    const nameBasedItems = await getItemsByName(query);
                    setTextInput('');
                    setSearchResults(nameBasedItems);
                    setIsReadyToNavigate(true);
                }
            } catch (error) {
                console.log('Error: ', error);
                setErrorMsg(true);
                setIsReadyToNavigate(false);
            } finally {
                setLoading(false);
            }
        };
        searchItemByNameAndIngredient(textInput);
    };

    // Checks wether it is ready to navigate or not.
    useEffect(() => {
        if (
            searchResults !== null &&
            searchResults.length > 0 &&
            isReadyToNavigate
        ) {
            navigation.navigate(AppStackScreens.SearchResults, {
                recipes: searchResults,
            });
            setIsReadyToNavigate(false);
        }
    }, [isReadyToNavigate, searchResults, navigation]);

    // API call for JustForYou section and location list.
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

    // API call for Trending Recipes section by using random location.
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
        <SafeAreaView style={[globalStyle.flex, globalStyle.backgroundColor]}>
            <SafeAreaProvider>
                <View style={style.container}>
                    <View style={style.titleContainer}>
                        <Title type={1} text={'Chef4U'} color={'#25AE87'} />
                        <Title
                            type={2}
                            text={'Discover Best Recipes'}
                            color={'#AEAEAE'}
                        />
                    </View>
                    <ScrollView
                        contentContainerStyle={style.paddingBottom}
                        showsVerticalScrollIndicator={false}>
                        <SearchBar
                            text={textInput}
                            onType={handleSearchInput}
                            onEnter={handleSearchRequest}
                            onSearch={handleSearchRequest}
                        />
                        {suggestedMeal?.length > 0 && !errorMsg && (
                            <View style={style.suggestion}>
                                <Title
                                    type={2}
                                    text={'Just For You'}
                                    color={'black'}
                                />
                                <FoodCard
                                    isSuggestion={true}
                                    containerStyle={suggestedCardStyle}
                                    recipeItem={suggestedMeal[0]}
                                    onPress={() => {
                                        navigation.navigate(
                                            AppStackScreens.Details,
                                            { recipeItem: suggestedMeal[0] },
                                        );
                                    }}
                                />
                            </View>
                        )}

                        {trendingFoods.length > 0 && !errorMsg && (
                            <View style={style.trendingContainer}>
                                <Title
                                    type={2}
                                    text={'Trending Recipes'}
                                    color={'black'}
                                />
                                <FlatList
                                    keyExtractor={item => item.idMeal!}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    data={trendingFoods}
                                    renderItem={({ item }) => {
                                        return (
                                            <FoodCard
                                                key={item.idMeal}
                                                containerStyle={
                                                    trendingCardStyle
                                                }
                                                recipeItem={item}
                                                onPress={() => {
                                                    navigation.navigate(
                                                        AppStackScreens.Details,
                                                        { recipeItem: item },
                                                    );
                                                }}
                                            />
                                        );
                                    }}
                                />
                            </View>
                        )}
                    </ScrollView>
                </View>
            </SafeAreaProvider>
        </SafeAreaView>
    );
};

export default Home;
