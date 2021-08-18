import { useEffect } from "react";
import { mockServer } from './mock/index';
import { Container } from "./styles/container";
import { PostList } from "./components/PostList";

const App: React.FC = () => {
  useEffect(() => {
    mockServer();
  }, []);

  return (
    <Container>
      <PostList />
    </Container>
  );
};
export default App;
