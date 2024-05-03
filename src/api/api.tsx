import axios, { AxiosResponse } from 'axios';
import { Meal } from '../interface';

const base_url = 'https://www.themealdb.com/api/json/v1/1/';

const getSuggestedItem = async (): Promise<Meal> => {
    const response: AxiosResponse = await axios.get(`${base_url}/random.php`);
    return response.data.meals[0];
};

export default getSuggestedItem;
