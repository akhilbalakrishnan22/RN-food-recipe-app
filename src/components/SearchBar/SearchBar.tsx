import React from 'react';
import { TextInput, View } from 'react-native';
import style from './style';

type SearchBarProp = {
    text: string;
    onType: (query: string) => void;
    onEnter: () => void;
};

const SearchBar = ({ text, onType, onEnter }: SearchBarProp) => {
    return (
        <View style={style.searchContainer}>
            <TextInput
                value={text}
                style={style.textInput}
                placeholder="Search here . . ."
                onChangeText={value => onType(value)}
                inputMode={'search'}
                enablesReturnKeyAutomatically={true}
                onSubmitEditing={onEnter}
            />
        </View>
    );
};

export default SearchBar;
