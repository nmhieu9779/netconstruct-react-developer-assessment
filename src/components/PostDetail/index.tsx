import React from 'react';
import { Panel, PanelLeft, PanelImage, PanelRight, PanelParagraph, PanelSpan, PanelUL, PanelLi, PanelFooter, PabelBackBtn } from './styles';

export const PostDetail: React.FC = () => {
    return (
        <Panel>
            <PanelLeft>
                <PanelImage src={'https://robohash.org/estdoloribuscum.jpg?size=50x50&set=set1'} alt="" width={100} height={100}></PanelImage>
            </PanelLeft>
            <PanelRight>
                <PanelParagraph>Johnson Baby</PanelParagraph>
                <PanelParagraph>5 days ago</PanelParagraph>
                <PanelParagraph>Title justo sit amet sapien dignissim vestibulum</PanelParagraph>
                <PanelParagraph>Summary: Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, architecto ut! Itaque amet eius magni repellat magnam sint necessitatibus recusandae iusto a deserunt! Repudiandae vero assumenda labore nulla id possimus.</PanelParagraph>
                <PanelParagraph>Categories</PanelParagraph>
                <PanelUL>
                    <PanelLi>Data Management</PanelLi>
                    <PanelLi>Surveys and Forms</PanelLi>
                    <PanelLi>Marketing Analytics</PanelLi>
                    <PanelLi>Landing Pages</PanelLi>
                </PanelUL>
                <PanelSpan>Publish Date: 22-5-2021</PanelSpan>
                <PanelFooter>
                    <PabelBackBtn>Back</PabelBackBtn>
                </PanelFooter>
            </PanelRight>
        </Panel>
    )
};