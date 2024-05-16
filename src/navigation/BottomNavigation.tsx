import { faBookmark, faHome, faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Categories from '../screens/Categories/Categories';
import Home from '../screens/Home/Home';
import Saved from '../screens/Saved/Saved';
import { BottomTabScreens } from './Route';
const BottomTab = createBottomTabNavigator();

type NavIconProps = {
    color: string;
    size: number;
};

const HomeIcon = ({ color, size }: NavIconProps) => {
    return <FontAwesomeIcon icon={faHome} color={color} size={size} />;
};
const CategoriesIcon = ({ color, size }: NavIconProps) => {
    return <FontAwesomeIcon icon={faList} color={color} size={size} />;
};
const SavedIcon = ({ color, size }: NavIconProps) => {
    return <FontAwesomeIcon icon={faBookmark} color={color} size={size} />;
};
const setTabBarIcon =
    (IconComponent: React.FC<NavIconProps>) =>
    ({ color, size }: NavIconProps) =>
        <IconComponent color={color} size={size} />;

const BottomNavigation = () => {
    return (
        <BottomTab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#25AE87',
                tabBarInactiveTintColor: 'rgba(9,9,9,0.3)',
                tabBarStyle: {
                    borderTopWidth: 0,
                },
            }}>
            <BottomTab.Screen
                name={BottomTabScreens.Home}
                component={Home}
                options={{
                    tabBarIcon: setTabBarIcon(HomeIcon),
                }}
            />
            <BottomTab.Screen
                name={BottomTabScreens.Categories}
                component={Categories}
                options={{
                    tabBarIcon: setTabBarIcon(CategoriesIcon),
                }}
            />
            <BottomTab.Screen
                name={BottomTabScreens.Saved}
                component={Saved}
                options={{
                    tabBarIcon: setTabBarIcon(SavedIcon),
                }}
            />
        </BottomTab.Navigator>
    );
};

export default BottomNavigation;
