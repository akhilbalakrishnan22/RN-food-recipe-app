import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useTheme } from '@react-navigation/native';
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
    const { colors } = useTheme();
    return (
        <View
            style={{
                ...style.searchContainer,
                backgroundColor: colors.background,
            }}>
            <TextInput
                value={text}
                style={{ ...style.textInput, color: colors.text }}
                placeholder="Search here . . ."
                placeholderTextColor={colors.text}
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
