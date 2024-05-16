import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Details from '../screens/Details/Details';
import Results from '../screens/Results/Results';
import BottomNavigation from './BottomNavigation';
import { AppStackScreens } from './Route';

const AppStack = createStackNavigator();

const AppStackNavigation = () => {
    return (
        <AppStack.Navigator screenOptions={{ headerShown: false }}>
            <AppStack.Screen
                name={AppStackScreens.BottomTabs}
                component={BottomNavigation}
            />
            <AppStack.Screen
                name={AppStackScreens.Details}
                component={Details}
            />
            <AppStack.Screen
                name={AppStackScreens.SearchResults}
                component={Results}
            />
        </AppStack.Navigator>
    );
};

export default AppStackNavigation;
