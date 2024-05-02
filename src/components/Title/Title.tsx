import React from 'react';
import { Text, View } from 'react-native';
import style from './style';

type TitleProp = {
    type: number;
    color: string;
    text: string;
};

const Title = ({ text, color, type = 1 }: TitleProp) => {
    const styleToApply = () => {
        switch (type) {
            case 1:
                return style.title1;
            case 2:
                return style.title2;
            case 3:
                return style.title3;
            case 4:
                return style.title4;
            case 5:
                return style.title5;
            case 6:
                return style.title6;
            default:
                return style.title1;
        }
    };

    return (
        <View>
            <Text
                style={[styleToApply(), color.length > 0 && { color: color }]}>
                {text}
            </Text>
        </View>
    );
};

export default Title;
