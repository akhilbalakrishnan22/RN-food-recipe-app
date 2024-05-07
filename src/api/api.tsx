import axios from 'axios';
import { Location, Meal } from '../interface';

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
