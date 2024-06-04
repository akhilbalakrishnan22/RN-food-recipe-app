import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, ScrollView, View } from 'react-native';
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
    const [suggestedLoading, setSuggestedLoading] = useState<boolean>(true);
    const [trendingLoading, setTrendingLoading] = useState<boolean>(true);

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
                setSuggestedLoading(true);
                setSuggestedMeal([]);
                const { suggestedItem, areaList } =
                    await getSuggestedItemAndArea();
                setSuggestedMeal(suggestedItem);
                setLocations(areaList);
            } catch (error) {
                console.log(error);
                setErrorMsg(true);
            } finally {
                setSuggestedLoading(false);
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
                setTrendingLoading(true);
                setTrendingFoods([]);
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
                setTrendingLoading(false);
            }
        };
        getTrending(locationArray[randomLocation]);
    }, [locations]);

    const trendingCardStyle = {
        marginTop: 21,
        marginRight: 31,
        width: 205,
        height: 250,
        borderRadius: 15,
    };

    const suggestedCardStyle = {
        marginTop: 19,
        height: 153,
        borderRadius: 15,
    };

    const { colors } = useTheme();

    if (loading) {
        return (
            <View style={globalStyle.loadingIndicator}>
                <ActivityIndicator size={'large'} color={'#25AE87'} />
            </View>
        );
    }

    return (
        <SafeAreaView
            style={{ ...globalStyle.flex, backgroundColor: colors.card }}>
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
                                    color={colors.text}
                                />
                                <FoodCard
                                    isLoading={suggestedLoading}
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
                                    color={colors.text}
                                />
                                <FlatList
                                    keyExtractor={item => item.idMeal!}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    data={trendingFoods}
                                    renderItem={({ item }) => {
                                        return (
                                            <FoodCard
                                                isLoading={trendingLoading}
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
