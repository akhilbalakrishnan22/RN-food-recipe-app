import React from 'react';
import { StyleProp, Text, TouchableOpacity, ViewStyle } from 'react-native';
import style from './style';

type ButtonProp = {
    text: string;
    containerStyle?: StyleProp<ViewStyle>;
    onPress: () => void;
};

const Button = ({ text, containerStyle, onPress }: ButtonProp) => {
    return (
        <TouchableOpacity style={containerStyle} onPress={onPress}>
            <Text style={style.text}>{text}</Text>
        </TouchableOpacity>
    );
};

export default Button;
