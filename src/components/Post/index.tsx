import React from 'react';
import { Wrapper, Header, AvatarInfo, Content, Title, ButtonList, Button } from './styles';

export const Post: React.FC<PostProps> = ({post}) => {
    return (
        <Wrapper>
            <Header>
                <AvatarInfo>
                    <img src={post.author.avatar} alt="avatar" width={40} height={40} />
                    <h4>{post.author.name}</h4>
                </AvatarInfo>
                <span>{new Date(post.publishDate).toDateString()}</span>
            </Header>
            <Content>
                <Title>
                    Title
                </Title>
                <p>{post.title}</p>
                <Title>
                    Summary
                </Title>
                <p>{post.summary}</p>
                <Title>
                    Categories
                </Title>
                <ButtonList>
                    {post.categories.map((post, index) => {
                        if (index % 2 === 0) {
                            return <Button>{post.name}</Button>
                        }
                        return <Button color="tomato" borderColor="tomato">{post.name}</Button>
                    })}
                </ButtonList>
            </Content>
        </Wrapper>
    );
}
