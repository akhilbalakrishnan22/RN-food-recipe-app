import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Categories from '../screens/Categories/Categories';
import Home from '../screens/Home/Home';
import { Routes } from './Route';

const BottomTab = createBottomTabNavigator();

const BottomNavigation = () => {
    return (
        <BottomTab.Navigator
            screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
            <BottomTab.Screen name={Routes.Home} component={Home} />
            <BottomTab.Screen name={Routes.Categories} component={Categories} />
            {/* <BottomTab.Screen name={Routes.Saved} component={Saved} /> */}
        </BottomTab.Navigator>
    );
};

export default BottomNavigation;
