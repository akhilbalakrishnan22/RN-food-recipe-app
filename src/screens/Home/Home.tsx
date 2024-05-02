import React from 'react';
import { View } from 'react-native';
import Title from '../../components/Title/Title';
import style from './style';
import SearchBar from '../../components/SearchBar/SearchBar';

const Home = () => {
    return (
        <View style={style.container}>
            <Title type={1} text={'Discover Best Recipes'} color={'#25AE87'} />
            <SearchBar />
        </View>
    );
};

export default Home;
