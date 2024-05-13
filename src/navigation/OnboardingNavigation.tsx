import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import OnBoarding from '../screens/Onboarding/OnBoarding';
import BottomNavigation from './BottomNavigation';
import { Routes } from './Route';

const Stack = createStackNavigator();

const OnboardingNavigation = () => {
    return (
        <Stack.Navigator
            initialRouteName={Routes.Onboarding}
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name={Routes.Onboarding} component={OnBoarding} />
            <Stack.Screen
                name={Routes.HomeWithTab}
                component={BottomNavigation}
            />
        </Stack.Navigator>
    );
};

export default OnboardingNavigation;
