import {
    IconDefinition,
    faBookmark,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useCallback, useEffect, useState } from 'react';
import {
    Alert,
    FlatList,
    ImageBackground,
    Pressable,
    View,
} from 'react-native';
import YouTubePlayer from 'react-native-youtube-iframe';
import IngredientCard from '../../components/IngredientCard/IngredientCard';
import Title from '../../components/Title/Title';
import { Ingredient, Meal } from '../../interface';
import style from './style';

/** FlatList Header **/
type FlatListHeaderProp = {
    recipeItem: Meal;
};

const FlatListHeader = ({ recipeItem }: FlatListHeaderProp) => {
    return (
        <View>
            <View style={style.contentDescription}>
                {recipeItem?.strInstructions && (
                    <Title
                        type={5}
                        numberOfLines={0}
                        text={recipeItem.strInstructions}
                        color="rgba(9,9,9,0.7)"
                    />
                )}
            </View>
            <View style={style.contentIngredients}>
                <View style={style.ingredientsHeader}>
                    <Title type={2} text={'Ingredients'} color="black" />
                    <Title type={2} text={'(12)'} color="#25AE87" />
                </View>
            </View>
        </View>
    );
};

/** FlatList Footer **/
type FlatListFooterProp = {
    recipeItem: Meal;
};

const FlatListFooter = ({ recipeItem }: FlatListFooterProp) => {
    const getYoutubeVideoId = (url: string) => {
        const regExp =
            /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return match && match[2].length === 11 ? match[2] : 'error';
    };

    const [playing, setPlaying] = useState<boolean>(false);

    const onStateChange = useCallback((state: string) => {
        console.log(state);
        if (state === 'ended') {
            setPlaying(false);
            Alert.alert('Video finished');
        }
    }, []);

    return (
        <View>
            {recipeItem.strYoutube ? (
                <View style={style.videoContainer}>
                    <View style={style.videoContainerTitle}>
                        <Title type={2} text="YouTube" color="black" />
                    </View>
                    <YouTubePlayer
                        height={300}
                        play={playing}
                        videoId={
                            recipeItem?.strYoutube
                                ? getYoutubeVideoId(recipeItem.strYoutube)
                                : ''
                        }
                        onChangeState={onStateChange}
                    />
                </View>
            ) : (
                <></>
            )}
        </View>
    );
};

/** Details **/
type DetailsProp = {
    recipeItem: Meal;
    onPress: () => void;
    icon?: IconDefinition;
    size?: number;
};

const Details = ({
    recipeItem,
    onPress,
    icon = faBookmark,
    size = 24,
}: DetailsProp) => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [saved, setSaved] = useState<boolean>(false);

    const getAllIngredientsAndMeasure = (meal: Meal) => {
        const ingredientsData: Ingredient[] = [];
        if (meal !== null) {
            for (let i = 1; i <= 20; i++) {
                const strIngredient = meal[`strIngredient${i}` as keyof Meal];
                const strMeasure = meal[`strMeasure${i}` as keyof Meal];

                if (
                    strIngredient?.trim() !== '' &&
                    strMeasure?.trim() !== '' &&
                    strIngredient !== null &&
                    strMeasure !== null
                ) {
                    ingredientsData.push({
                        id: `${i}`,
                        ingredient: {
                            strIngredient,
                            strMeasure,
                        },
                    });
                }
            }
        }
        return ingredientsData;
    };

    useEffect(() => {
        setIngredients(getAllIngredientsAndMeasure(recipeItem));
    }, [recipeItem]);

    return (
        <View style={style.container}>
            <View style={style.imageContainer}>
                {recipeItem.strMealThumb ? (
                    <ImageBackground
                        style={style.image}
                        resizeMode={'cover'}
                        source={{ uri: recipeItem.strMealThumb }}
                    />
                ) : (
                    <></>
                )}
            </View>
            <View style={style.contentContainer}>
                <View style={style.contentHeader}>
                    <View style={style.title}>
                        {recipeItem?.strMeal && (
                            <Title
                                type={2}
                                numberOfLines={3}
                                text={recipeItem.strMeal}
                                color="black"
                            />
                        )}
                    </View>
                    <Pressable onPress={onPress}>
                        <FontAwesomeIcon
                            icon={icon}
                            size={size}
                            color="#25AE87"
                        />
                    </Pressable>
                </View>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={
                        <FlatListHeader recipeItem={recipeItem} />
                    }
                    keyExtractor={item => item.id!}
                    data={ingredients}
                    renderItem={({ item }) => {
                        return <IngredientCard key={item.id} item={item} />;
                    }}
                    ListFooterComponent={
                        <FlatListFooter recipeItem={recipeItem} />
                    }
                />
            </View>
        </View>
    );
};

export default Details;
