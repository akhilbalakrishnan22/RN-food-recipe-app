import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { ImageBackground, StatusBar, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../components/Button/Button';
import style from './style';

const OnBoarding = () => {
    const buttonStyle = {
        marginTop: 69,
        paddingVertical: 18,
        borderRadius: 15,
        backgroundColor: '#25AE87',
    };

    const setFirstLaunch = async () => {
        try {
            await AsyncStorage.setItem('hasOnboarded', JSON.stringify('true'));
        } catch (error) {
            console.log(error);
        }
    };

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
                    onPress={setFirstLaunch}
                />
            </View>
        </View>
    );
};

export default OnBoarding;
