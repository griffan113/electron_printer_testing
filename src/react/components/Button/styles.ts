import styled from "styled-components";

interface IButtonContainer {
  isPrimary: boolean;
}

export const Container = styled.button<IButtonContainer>`
  background-color: ${(props) => props.isPrimary ? "grey" : "#560000"};
  color: white;

  border-radius: ${(props) => props.isPrimary ? "5px" : "50%"};
  border: none;

  width: ${(props) => props.isPrimary ? "" : "30px"};
  height: ${(props) => props.isPrimary ? "" : "30px"};
  padding: 5px;
  margin: 10px;

  &&:hover {
    filter: brightness(0.9);
  }
`;