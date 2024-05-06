import axios from 'axios';
import { Location, Meal } from '../interface';

const base_url = 'https://www.themealdb.com/api/json/v1/1';

export const getSuggestedItemAndArea = async (): Promise<{
    suggestedItem: Meal;
    areaList: Location[];
}> => {
    const suggestedItemRequest = await axios.get(`${base_url}/random.php`);
    const areaListRequest = await axios.get(`${base_url}/list.php?a=list`);

    const [suggestedItemResponse, areaListResponse] = await axios.all([
        suggestedItemRequest,
        areaListRequest,
    ]);

    return {
        suggestedItem: suggestedItemResponse.data.meals[0],
        areaList: areaListResponse.data.meals,
    };
};
