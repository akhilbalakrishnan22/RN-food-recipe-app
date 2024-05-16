import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { Pressable, TextInput, View } from 'react-native';
import style from './style';

type SearchBarProp = {
    text: string;
    onType: (query: string) => void;
    onEnter: () => void;
    onSearch: () => void;
};

const SearchBar = ({ text, onType, onEnter, onSearch }: SearchBarProp) => {
    return (
        <View style={style.searchContainer}>
            <TextInput
                value={text}
                style={style.textInput}
                placeholder="Search here . . ."
                placeholderTextColor={'#6B6B6B'}
                onChangeText={value => onType(value)}
                inputMode={'search'}
                enablesReturnKeyAutomatically={true}
                onSubmitEditing={onEnter}
            />
            <Pressable style={style.searchIcon} onPress={onSearch}>
                <FontAwesomeIcon icon={faSearch} size={22} color="#B8B8B8" />
            </Pressable>
        </View>
    );
};

export default SearchBar;
