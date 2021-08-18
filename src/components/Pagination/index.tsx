import React, { useState } from 'react';
import LoadingIndicator from '../LoadingIndicator';
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

type Props = {
    RenderComponent: React.FC<PostProps>;
    data: IPost[];
    title: string;
    pageLimit: number;
    dataLimit: number;
}

export const Pagination: React.FC<Props> = ({ RenderComponent, data, title, pageLimit, dataLimit }) => {
    const [pages] = useState(Math.round(data.length / dataLimit));
    const [currentPage, setCurrentPage] = useState(1);

    function goToNextPage() {
        setCurrentPage((page) => page + 1);
    }

    function goToPreviousPage() {
        setCurrentPage((page) => page - 1);
    }

    function changePage(event: any) {
        const pageNumber = Number(event.target.textContent);
        setCurrentPage(pageNumber);
    }

    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit;
        const endIndex = startIndex + dataLimit;
        return data.slice(startIndex, endIndex);
    };

    const getPaginationGroup = () => {
        const start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
        return new Array(pageLimit).fill(1).map((_, idx) => start + idx + 1);
    };
    return (
        <>
            {data.length < 1 ? (
                <LoadingIndicator></LoadingIndicator>
            ) : (
                <div>
                    <h1>{title}</h1>
                    {getPaginatedData().map((data) => (
                        <RenderComponent post={data} key={data.id} />
                    ))}
                    <StyledPagination>
                        {/* previous button */}
                        {currentPage === 1 ? (
                            <StyledPaginationPrevDisabledBtn onClick={goToPreviousPage}>Prev</StyledPaginationPrevDisabledBtn>
                        ) : (
                            <StyledPaginationPrevBtn onClick={goToPreviousPage}>Prev</StyledPaginationPrevBtn>
                        )}
                        {getPaginationGroup().map((item, index) => {
                            if (currentPage === item) {
                                return (
                                    <StyledPaginationItemActive key={index} onClick={changePage}>
                                        <StyledPaginationItemSpan>{item}</StyledPaginationItemSpan>
                                    </StyledPaginationItemActive>
                                )
                            }
                            return (
                                <StyledPaginationItem key={index} onClick={changePage}>
                                    <StyledPaginationItemSpan>{item}</StyledPaginationItemSpan>
                                </StyledPaginationItem>
                            )
                        })}
                        {/* next button */}
                        {currentPage === pages ? (
                            <StyledPaginationNextDisabledBtn onClick={goToNextPage}>Next</StyledPaginationNextDisabledBtn>
                        ) : (
                            <StyledPaginationNextBtn onClick={goToNextPage}>Next</StyledPaginationNextBtn>
                        )}
                    </StyledPagination>
                </div>
            )}
        </>
    )
}