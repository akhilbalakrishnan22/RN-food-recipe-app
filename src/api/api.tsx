import axios from 'axios';
import { Category, Location, Meal } from '../interface';

const base_url = 'https://www.themealdb.com/api/json/v1/1';

export const getSuggestedItemAndArea = async (): Promise<{
    suggestedItem: Meal[];
    areaList: Location[];
}> => {
    const suggestedItemRequest = await axios.get(`${base_url}/random.php`);
    const areaListRequest = await axios.get(`${base_url}/list.php?a=list`);

    const [suggestedItemResponse, areaListResponse] = await axios.all([
        suggestedItemRequest,
        areaListRequest,
    ]);

    return {
        suggestedItem: suggestedItemResponse.data.meals,
        areaList: areaListResponse.data.meals,
    };
};

export const getItemsByLocation = async (location: string): Promise<Meal[]> => {
    const locationBasedRequest = await axios.get(
        `${base_url}/filter.php?a=${location}`,
    );
    return locationBasedRequest.data.meals;
};

export const getItemById = async (id: number): Promise<Meal[]> => {
    const idBasedRequest = await axios.get(`${base_url}/lookup.php?i=${id}`);
    return idBasedRequest.data.meals;
};

export const getItemsByName = async (query: string): Promise<Meal[]> => {
    const nameBasedRequest = await axios.get(
        `${base_url}/search.php?s=${query}`,
    );

    return nameBasedRequest.data.meals;
};

export const getAllCategories = async (): Promise<Category[]> => {
    const categoriesList = await axios.get(`${base_url}/categories.php`);
    return categoriesList.data.categories;
};

export const getItemsByCategory = async (category: string): Promise<Meal[]> => {
    const categoryBasedRequest = await axios.get(
        `${base_url}/filter.php?c=${category}`,
    );
    return categoryBasedRequest.data.meals;
};
