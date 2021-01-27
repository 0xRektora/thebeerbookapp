import axios, { AxiosInstance } from 'axios';
import CONFIG from './config';

class TheBeerBookAPI {
    public handler: AxiosInstance;

    constructor() {
        this.handler = axios.create({
            baseURL: CONFIG.api.THE_BEER_BOOK_ROUTE,
            headers: {
                Accept: 'application/json, text/plain, */*',
            },
        });
    }
}
export default new TheBeerBookAPI();
