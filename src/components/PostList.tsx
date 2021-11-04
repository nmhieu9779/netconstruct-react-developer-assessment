import { memo } from 'react';
import { PostDto } from '../dto';
import Post from './Post';

interface Props {
  data: PostDto[];
  onClickCategory: (category: string) => void;
}

const PostList: React.FC<Props> = (props) => {
  const { data, onClickCategory } = props;

  if (data.length === 0) {
    return <div />;
  }

  return (
    <>
      {data.map((post) => (
        <Post key={post.id} onClickCategory={onClickCategory} {...post} />
      ))}
    </>
  );
};

export default memo(PostList);
