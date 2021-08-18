import styled from 'styled-components';

const StyledPagination = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledPaginationItem = styled.button`
    background: #fff;
    border: 2px solid #666;
    padding: 10px 15px;
    border-radius: 50%;
    height: 45px;
    width: 45px;
    position: relative;
    margin: 0 5px;
    cursor: pointer;
`;

const StyledPaginationItemActive = styled(StyledPaginationItem)`
    border: 1px solid #888;
    color: #888;
    pointer-events: none;
`;

const StyledPaginationItemSpan = styled.span`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const StyledPaginationNextBtn = styled.button`
    background: #fff;
    border: none;
    padding: 10px;
    color: blue;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.4);
    margin: 0 10px;
    cursor: pointer;
`;

const StyledPaginationNextDisabledBtn = styled(StyledPaginationNextBtn) `
    pointer-events: none;
    box-shadow: none;
    color: #999;
`;

const StyledPaginationPrevBtn = styled(StyledPaginationNextBtn)``;
const StyledPaginationPrevDisabledBtn = styled(StyledPaginationNextDisabledBtn)``;

export {
    StyledPagination, 
    StyledPaginationItem, 
    StyledPaginationItemActive, 
    StyledPaginationItemSpan, 
    StyledPaginationNextBtn,
    StyledPaginationPrevBtn,
    StyledPaginationNextDisabledBtn,
    StyledPaginationPrevDisabledBtn
};