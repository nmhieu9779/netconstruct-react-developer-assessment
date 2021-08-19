import styled from "styled-components";

type THProps = {
    width?: number;
}

type TDProps = {
    width?: number;
}

const TableWrapper = styled.div`
    position: relative;
    padding-top: 60px;
    background-color: #fff;
    border-radius: 10px;
    width: 50%;
    overflow: hidden;
    margin: 10px 0;
    box-shadow: 0 0px 40px 0px rgba(0, 0, 0, 0.15);
    -moz-box-shadow: 0 0px 40px 0px rgba(0, 0, 0, 0.15);
    -webkit-box-shadow: 0 0px 40px 0px rgba(0, 0, 0, 0.15);
    -o-box-shadow: 0 0px 40px 0px rgba(0, 0, 0, 0.15);
    -ms-box-shadow: 0 0px 40px 0px rgba(0, 0, 0, 0.15);
`;

const TableHead = styled.div`
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    text-align: left;
    box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
    -webkit-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
    -o-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
    -ms-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
`;

const TableTH = styled.th<THProps> `
    width: ${props => props.width + '%' ?? 0};
    font-family: Lato-Bold;
    font-size: 18px;
    color: #fa4251;
    line-height: 1.4;
    background-color: transparent;
    padding: 18px 10px;
    font-weight: unset;
`;

const TableBody = styled.div`

`;

const TableTD = styled.td<TDProps> `
    width: ${props => props.width + '%' ?? 0};
    padding: 16px 10px;
    font-weight: unset;
    font-family: Lato-Regular;
    font-size: 15px;
    color: #808080;
    line-height: 1.4;
`;

const TableTR = styled.tr`
    &:nth-child(odd) {
      background-color: aliceblue;
    }
    border-bottom: 1px solid #f2f2f2;
`;

const Pagination = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 10px;
    box-shadow: 0 5px 20px 0px rgb(0 0 0 / 10%);
`;

const PaginationLeftSide = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const PaginationRightSide = styled.div``;

const PaginationLeftSideLabel = styled.span`
    display: inline-block;
    margin-right: 10px;
    font-family: Lato-Regular;
    font-size: 15px;
    color: #808080;
    line-height: 1.4;
`;

const PaginationRightSideCounter = styled.div`
    display: inline-block;
    font-family: Lato-Regular;
    font-size: 15px;
    color: #808080;
    line-height: 1.4;
    margin-right: 10px;
`

const PaginationRightSideDirection = styled(PaginationRightSideCounter)`
    padding: 10px;
    text-decoration: none;
    &:hover {
    cursor: pointer;
    background-color: aliceblue;
    }
`;

export {
    TableWrapper,
    TableHead,
    TableBody,
    TableTR,
    TableTH,
    TableTD,
    Pagination,
    PaginationLeftSide,
    PaginationRightSide,
    PaginationLeftSideLabel,
    PaginationRightSideCounter,
    PaginationRightSideDirection
};