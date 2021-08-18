import axios, { AxiosResponse } from 'axios';

export const getPosts = async (query: IGetPostsQuery)
: Promise<IGetPostsResults> => {
    try {
        const resp:AxiosResponse = await axios.get('/api/posts', {
            params: query
        });
        return resp.data;
    } catch (e) {
        throw new Error(e);
    }
}
