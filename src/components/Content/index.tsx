import React, { useEffect, useState } from 'react';
import { getPosts } from '../../api';
import LoadingIndicator from '../LoadingIndicator';
import { Post } from '../Post';
import {
    StyledPagination,
    StyledPaginationItem,
    StyledPaginationItemActive,
    StyledPaginationItemSpan,
    StyledPaginationNextBtn,
    StyledPaginationPrevBtn,
    StyledPaginationNextDisabledBtn,
    StyledPaginationPrevDisabledBtn
} from './styles';

export const Content: React.FC = () => {
    const PAGE_SIZE = 5;
    
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState<IPost[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [pageList, setPageList] = useState<number[]>([]);
    
    useEffect(() => {
        fetchPage(1);
    }, [])

    const fetchPage = async (pageNum: number) => {
        // Show loading screen
        setLoading(true);

        const resp = await getPosts({
            limit: PAGE_SIZE,
            offset: (pageNum - 1) * PAGE_SIZE
        });

        // Posts
        setPosts(resp.results);
        
        // Pagination
        const pageCount = Math.ceil(resp.count / PAGE_SIZE);
        const pageArray = new Array(pageCount).fill(0).map((_, i) => i + 1);
        setPageCount(pageCount)
        setPageList(pageArray);
        setCurrentPage(pageNum);

        // Hide loading screen
        setLoading(false);
    }

    return (
        <>
            { loading ? (
                <LoadingIndicator></LoadingIndicator>
            ) : (
                <div>
                    <h1> Post List </h1>
                    { posts.map((data) => (
                        <Post post={data} key={data.id} />
                    ))}
                    <StyledPagination>
                        {/* previous button */}
                        {currentPage === 1 ? (
                            <StyledPaginationPrevDisabledBtn>Prev</StyledPaginationPrevDisabledBtn>
                        ) : (
                            <StyledPaginationPrevBtn
                                onClick={() => fetchPage(currentPage-1)}
                            >Prev</StyledPaginationPrevBtn>
                        )}
                        { pageList.map((item) => {
                            if (currentPage === item) {
                                return (
                                    <StyledPaginationItemActive key={item} onClick={() => fetchPage(item)}>
                                        <StyledPaginationItemSpan>{item}</StyledPaginationItemSpan>
                                    </StyledPaginationItemActive>
                                )
                            }
                            return (
                                <StyledPaginationItem key={item} onClick={() => fetchPage(item)}>
                                    <StyledPaginationItemSpan>{item}</StyledPaginationItemSpan>
                                </StyledPaginationItem>
                            )
                        })}
                        {/* next button */}
                        { currentPage === pageCount ? (
                            <StyledPaginationNextDisabledBtn>Next</StyledPaginationNextDisabledBtn>
                        ) : (
                            <StyledPaginationNextBtn
                                onClick={() => fetchPage(currentPage+1)}
                            >Next</StyledPaginationNextBtn>
                        )}
                    </StyledPagination>
                </div>
            )}
        </>
    )
}
