import axios, { AxiosResponse } from 'axios';

const baseURL = 'http://localhost:3000';

export const getPosts = async (): Promise<any> => {
    try {
        const posts = axios.get(baseURL + '/api/posts');
        return posts;
    }catch(e) {
        throw new Error(e);
    }
}
