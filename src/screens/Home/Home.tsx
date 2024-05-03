import React from 'react';
import { View } from 'react-native';
import SearchBar from '../../components/SearchBar/SearchBar';
import Title from '../../components/Title/Title';
import TrendingCard from '../../components/TrendingCard/TrendingCard';
import style from './style';

const Home = () => {
    return (
        <View style={style.container}>
            <Title type={1} text={'Discover Best Recipes'} color={'#25AE87'} />
            <SearchBar />
            <View style={style.suggestion}>
                <Title type={2} text={'Just For You'} color={'black'} />
            </View>
            <View style={style.trendingContainer}>
                <Title type={2} text={'Trending Recipes'} color={'black'} />
                <TrendingCard />
            </View>
        </View>
    );
};

export default Home;
