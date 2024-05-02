import { View, Text, StatusBar, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import style from './style';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../components/Button/Button';

const OnBoarding = () => {
    const buttonStyle = {
        marginTop: 69,
        paddingVertical: 18,
        borderRadius: 15,
        backgroundColor: '#25AE87',
    };

    const [firstLaunch, setFirstLaunch] = useState<boolean>(false);

    return (
        <View style={style.container}>
            <StatusBar barStyle={'light-content'} />

            <View style={style.header}>
                <ImageBackground
                    style={style.backgroundImage}
                    source={require('../../../assets/images/onboardingImage.png')}
                    resizeMode={'stretch'}>
                    <LinearGradient
                        style={style.gradientShade}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        colors={['transparent', 'black']}>
                        <Text style={style.title}>Cook Like a Chef</Text>
                    </LinearGradient>
                </ImageBackground>
            </View>

            <View style={style.details}>
                <Text style={style.description}>
                    De Chef is a user-friendly recipe app designed for those who
                    are new to cooking and want to try new recipes at home
                </Text>
                <Button
                    text={'Get Started'}
                    containerStyle={buttonStyle}
                    onPress={() => {}}
                />
            </View>
        </View>
    );
};

export default OnBoarding;
