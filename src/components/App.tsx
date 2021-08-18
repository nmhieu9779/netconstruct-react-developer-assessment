import { useEffect, useState } from "react";
import makeServer from '../mock/index';
import { Container } from "../styles/container";
import { Content } from "./Content";

const App: React.FC = () => {
  useEffect(() => {
    makeServer();
  }, []);

  return (
    <>
      <Container>
        <Content />
      </Container>
    </>
  );
};
export default App;
