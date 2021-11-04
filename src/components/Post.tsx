import React, { memo, useCallback } from 'react';
import styled from 'styled-components';
import { PostDto } from '../dto';

const Container = styled.div`
  box-shadow: 6px 4px 12px 0px rgba(0, 0, 0, 0.59);
  -webkit-box-shadow: 6px 4px 12px 0px rgba(0, 0, 0, 0.59);
  -moz-box-shadow: 6px 4px 12px 0px rgba(0, 0, 0, 0.59);
  margin-bottom: 10px;
  border-radius: 5px;
  padding: 5px;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const Title = styled.span`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  cursor: default;
  font-weight: bold;
`;

const Content = styled.div`
  display: flex;
  margin-top: 10px;
`;

const AuthorContainer = styled.div`
  max-width: 100px;
  margin-left: 10px;
  margin-right: 10px;
`;

const Avatar = styled.img`
  width: 80px;
  height: 80px;
  padding: 10px;
  margin-right: 5px;
  border-radius: 80px;
  background-color: #f2f9ff;
`;

const Name = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  cursor: default;
`;

const SummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Summary = styled.div`
  flex: 1;
`;

const Categories = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  overflow: hidden;
`;

const Category = styled.div`
  padding: 5px;
  background-color: #96cdf6;
  border-radius: 5px;
  margin-left: 5px;
  margin-right: 5px;
  white-space: nowrap;
  cursor: pointer;
`;

const Divider = styled.div`
  width: 100%;
  height: 0.8px;
  background-color: #ccc;
`;

interface Props {
  onClickCategory: (category: string) => void;
}

const Post: React.FC<PostDto & Props> = (props) => {
  const { title, publishDate, author, summary, categories, onClickCategory } = props;

  const handleClickCategory = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      onClickCategory(e.currentTarget.title);
    },
    [onClickCategory],
  );

  return (
    <Container>
      <TitleContainer>
        <Title title={title}>{title}</Title>
        {new Date(publishDate).toLocaleDateString()}
      </TitleContainer>
      <Divider />
      <Content>
        <AuthorContainer>
          <Avatar title={author.name} src={author.avatar} />
          <Name title={author.name}>{author.name}</Name>
        </AuthorContainer>
        <SummaryContainer>
          <Summary>{summary}</Summary>
          <Categories>
            {categories.map((category) => (
              <Category title={category.name} key={category.id} onClick={handleClickCategory}>
                {category.name}
              </Category>
            ))}
          </Categories>
        </SummaryContainer>
      </Content>
    </Container>
  );
};

export default memo(Post);
