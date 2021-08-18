import styled from 'styled-components';

export const Loading = styled.div `
    display: inline-block;
    width: 80px;
    height: 80px;
    &:after {
        content: ' ';
        display: block;
        width: 64px;
        height: 64px;
        margin: 8px;
        border-radius: 50%;
        border: 6px solid #de8a23;
        border-color: #de8a23 transparent #de8a23 transparent;
        animation: lds-dual-ring 1.2s linear infinite;
    }
`;