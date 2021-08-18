import React, { useEffect, useState } from 'react';
import { createBrowserHistory } from "history";
import qs from "qs";

import { getPosts } from '../../api';
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

const categoryList: ICategory[] = [
    { id: "c63bf3b1-06bd-4499-ab11-93b147ec948d", name: "Data Management" },
    { id: "7b28d5c0-0853-406f-b115-bd14c1ae683f", name: "Digital Marketing" },
    { id: "a1c141f7-0d0e-4521-ba2b-63d1265dcca1", name: "Ecommerce" },
    { id: "0f91bf2c-aa47-4372-8c22-b403899751b7", name: "Email Marketing" },
    { id: "fd738de2-aa84-436b-9282-ce5f6944dab7", name: "Landing Pages" },
    { id: "1ce0ff98-b6c3-4f9a-bc3a-a7dd41e8c471", name: "Marketing Analytics" },
    { id: "b17d04b7-57d8-4a37-bc76-343699cdb113", name: "Marketing Automation" },
    { id: "d8521992-c9ff-4e5e-bbb1-7715d8bdf833", name: "Platform News and Updates" },
    { id: "0e1eeaa5-9600-41b5-ade9-12c01efe0362", name: "Surveys and Forms" },
    { id: "41f72a87-5927-403d-89ce-216d325daa40", name: "Tips and Best Practise" },
];

export const PostList: React.FC = () => {
    const PAGE_SIZE = 5;
    
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [pageList, setPageList] = useState<number[]>([]);
    const [posts, setPosts] = useState<IPost[]>([]);
    const [categoryFilter, setCategoryFilter] = useState("All");
    
    const history = createBrowserHistory();

    useEffect(() => {
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
