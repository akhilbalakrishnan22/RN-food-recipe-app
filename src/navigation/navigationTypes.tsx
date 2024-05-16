import {
    BottomTabNavigationProp,
    BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { DetailsProp } from '../screens/Details/Details';
import { ResultsProp } from '../screens/Results/Results';
import { AppStackScreens, BottomTabScreens, OnboardingScreens } from './Route';

export type OnBoardingParamList = {
    [OnboardingScreens.OnBoarding]: undefined;
    [OnboardingScreens.AppEntry]: undefined;
};

export type OnboardingNavigationProp<
    RouteName extends keyof OnBoardingParamList = OnboardingScreens,
> = StackNavigationProp<OnBoardingParamList, RouteName>;

export type AppStackParamsList = {
    [AppStackScreens.BottomTabs]: undefined;
    [AppStackScreens.Details]: DetailsProp;
    [AppStackScreens.SearchResults]: ResultsProp;
};

export type AppStackScreenProps<
    RouteName extends keyof AppStackParamsList = AppStackScreens,
> = StackScreenProps<AppStackParamsList, RouteName>;

export type AppStackNavigationProp<
    RouteName extends keyof AppStackParamsList = AppStackScreens,
> = StackNavigationProp<AppStackParamsList, RouteName>;

export type AppStackRouteProp<
    RouteName extends keyof AppStackParamsList = AppStackScreens,
> = RouteProp<AppStackParamsList, RouteName>;

export type BottomTabsParamsList = {
    [BottomTabScreens.Home]: undefined;
    [BottomTabScreens.Categories]: undefined;
    [BottomTabScreens.Saved]: undefined;
};

export type BottomScreenProps<
    RouteName extends keyof BottomTabsParamsList = BottomTabScreens,
> = BottomTabScreenProps<BottomTabsParamsList, RouteName>;

export type BottomNavigationProp<
    RouteName extends keyof BottomTabsParamsList = BottomTabScreens,
> = BottomTabNavigationProp<BottomTabsParamsList, RouteName>;

export type BottomTabRouteProp<
    RouteName extends keyof BottomTabsParamsList = BottomTabScreens,
> = RouteProp<BottomTabsParamsList, RouteName>;
