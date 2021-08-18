
import styled from 'styled-components';

const Button = styled.button<ButtonProps>`
    background: ${props => props.backgroundColor ?? "white"};
    color: ${props => props.color ?? "palevioletred"};
    font-size: 1em;
    margin: 0.25em;
    padding: 0.25em 1em;
    border: 2px solid ${props => props.borderColor ?? "palevioletred"};
    border-radius: 3px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0.5em 1em;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  font-size: 1.5em;
  margin-bottom: 1em;
  background-color: #fff;
  width: 90vw;
  border-radius: 5px;
  &:hover {
      cursor: pointer;
      background-color: lightgray;
  }

  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Header = styled.section`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1em;
`;

const Content = styled(Header)`
  align-items: flex-start;
  flex-direction: column;
`;

const AvatarInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h3`
  margin-top: 15px;
`
const ButtonList = styled(AvatarInfo)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
`;

export { Button, Wrapper, Header, Content, AvatarInfo, Title, ButtonList };