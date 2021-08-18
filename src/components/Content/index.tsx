import React, { useEffect, useState } from 'react';
import { getPosts } from '../../API';
import { Pagination } from '../Pagination';
import { Post } from '../Post';

export const Content: React.FC = () => {
    const [posts, setPosts] = useState<IPost[]>([]);
    
    useEffect(() => {
        fetchPosts();
    }, [])

    const fetchPosts = () => {
        getPosts()
            .then(res => {
                setPosts(res.data.posts);
            })
            .catch(e => console.error(e))
    }

    return (
        <>
            <Pagination RenderComponent={Post} data={posts} title="Post List" pageLimit={5} dataLimit={5} />
        </>
    );
}
