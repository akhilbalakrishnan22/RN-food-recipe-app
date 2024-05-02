import React from 'react';
import { TextInput, View } from 'react-native';
import style from './style';

const SearchBar = () => {
    return (
        <View style={style.searchContainer}>
            <TextInput
                style={style.textInput}
                placeholder="Search here . . ."
            />
        </View>
    );
};

export default SearchBar;
