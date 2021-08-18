import { useEffect } from "react";
import { mockServer } from './mock/index';
import { Container } from "./styles/container";
import { Content } from "./components/Content";

const App: React.FC = () => {
  useEffect(() => {
    mockServer();
  }, []);

  return (
    <Container>
      <Content />
    </Container>
  );
};
export default App;
