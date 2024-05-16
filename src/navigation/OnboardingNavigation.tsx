import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import OnBoarding from '../screens/Onboarding/OnBoarding';
import AppStackNavigation from './StackNavigation';
import { OnboardingScreens } from './Route';

const Stack = createStackNavigator();

const OnboardingNavigation = () => {
    return (
        <Stack.Navigator
            initialRouteName={OnboardingScreens.OnBoarding}
            screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name={OnboardingScreens.OnBoarding}
                component={OnBoarding}
            />
            <Stack.Screen
                name={OnboardingScreens.AppEntry}
                component={AppStackNavigation}
            />
        </Stack.Navigator>
    );
};

export default OnboardingNavigation;
