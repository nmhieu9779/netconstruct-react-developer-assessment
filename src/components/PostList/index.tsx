import React, { useEffect, useState } from 'react';
import { createBrowserHistory } from "history";
import qs from "qs";

import { getPosts, getCategories } from '../../api';
import { Dropdown } from '../Dropdown';
import { Option } from '../Dropdown/Option';
import LoadingIndicator from '../LoadingIndicator';
import { Post } from '../Post';
import {
    Wrapper,
    StyledPagination,
    StyledPaginationItem,
    StyledPaginationItemActive,
    StyledPaginationItemSpan,
    StyledPaginationNextBtn,
    StyledPaginationPrevBtn,
    StyledPaginationNextDisabledBtn,
    StyledPaginationPrevDisabledBtn
} from './styles';

export const PostList: React.FC = () => {
    const PAGE_SIZE = 5;
    
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [pageList, setPageList] = useState<number[]>([]);
    const [posts, setPosts] = useState<IPost[]>([]);
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [categoryList, setCategoryList] = useState<ICategory[]>([]);
    
    const history = createBrowserHistory();

    useEffect(() => {
        fetchCategories()
    }, []);

    const fetchCategories = async () => {
        // Fetch CategoryList
        const categories = await getCategories();
        console.log(categories);
        setCategoryList(categories);        
    }

    useEffect(() => {
        // URLs Params 
        const urlParams = history.location.search.substr(1);
        const { page, category } = qs.parse(urlParams);
        if (page && category) {
            setCurrentPage(Number(page));
            setCategoryFilter(String(category));
        } else if (page) {
            setCurrentPage(Number(page));
        } else if (category) {
            setCategoryFilter(String(category));
        }
    }, []);

    useEffect(() => {
        fetchPage(currentPage);
    }, [categoryFilter]);

    const fetchPage = async (pageNum: number) => {
        // Show loading screen
        setLoading(true);
        let resp;
        if (categoryFilter !== "All") {
            resp = await getPosts({
                category: categoryFilter,
                limit: PAGE_SIZE,
                offset: (pageNum - 1) * PAGE_SIZE
            });
        } else {
            resp = await getPosts({
                limit: PAGE_SIZE,
                offset: (pageNum - 1) * PAGE_SIZE
            });
        }

        console.log(resp);

        // Posts
        setPosts(resp.results);
        
        // Pagination
        const pageCount = Math.ceil(resp.count / PAGE_SIZE);
        const pageArray = new Array(pageCount).fill(0).map((_, i) => i + 1);
        setPageCount(pageCount)
        setPageList(pageArray);
        setCurrentPage(pageNum);

        history.push(`?page=${pageNum}&category=${categoryFilter}`);

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
                    <Wrapper>
                        <Dropdown
                            formLabel="Choose a category"
                            action="/"
                            onChange={(e) => {
                                e.preventDefault();
                                setCategoryFilter(e.target.value)
                            }}
                        >
                            <Option selected value="All" />
                            { categoryList.map(item => (
                                <Option 
                                    selected={categoryFilter === item.name} 
                                    value={item.name} key={item.id}
                                />
                            ))}
                        </Dropdown>
                    </Wrapper>
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
