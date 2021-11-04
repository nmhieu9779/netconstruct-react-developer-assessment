import { memo, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { PostDto } from '../dto';
import Filter from './Fillter';
import PostList from './PostList';

const Container = styled.div`
  max-width: 50%;
  margin: auto;
  margin-top: 20px;
`;

const LoadMore = styled.div`
  width: 100%;
  display: flex;
`;

const LoadMoreButton = styled.button`
  padding: 10px;
  margin: auto;
`;

const PAGE_SIZE = 5;

const Home: React.FC = () => {
  const [posts, setPosts] = useState<PostDto[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [filteredPost, setFilteredPost] = useState<PostDto[]>([]);
  const [filterData, setFilterData] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);
  const [canLoadMore, setCanLoadMore] = useState<boolean>(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/posts').then((res) => res.json()),
      fetch('/api/categories').then((res) => res.json()),
    ]).then(([data, categories]) => {
      setPage(1);
      setPosts(data.posts);
      setCategories(categories);
    });
  }, []);

  useEffect(() => {
    let data = posts as PostDto[];
    if (filterData.length > 0) {
      data = data.filter((post) =>
        filterData.every((category) => post.categories.some(({ name }) => name === category)),
      );
    }
    setCanLoadMore(data.length > page * PAGE_SIZE);
    setFilteredPost(data.slice(0, page * PAGE_SIZE));
  }, [posts, filterData, page]);

  const handleChangeFilter = useCallback((data) => {
    setPage(1);
    setFilterData((prevState) => [...prevState, data]);
  }, []);

  const handleClickCategory = useCallback(
    (category: string) => {
      if (!filterData.includes(category)) {
        setPage(1);
        setFilterData([...filterData, category]);
      }
    },
    [filterData],
  );

  const handleLoadMore = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, []);

  return (
    <Container>
      <Filter data={categories} filterData={filterData} onChange={handleChangeFilter} />
      <PostList data={filteredPost} onClickCategory={handleClickCategory} />
      {canLoadMore && (
        <LoadMore>
          <LoadMoreButton onClick={handleLoadMore}>{'Load more'}</LoadMoreButton>
        </LoadMore>
      )}
    </Container>
  );
};

export default memo(Home);
