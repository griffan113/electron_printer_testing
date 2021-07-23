import styled from "styled-components";

interface IButtonContainer {
  isPrimary: boolean;
}

export const Container = styled.button<IButtonContainer>`
  background-color: ${(props) => props.isPrimary ? "grey" : "#560000"};
  border-radius: ${(props) => props.isPrimary ? "5px" : "50%"};
  width: ${(props) => props.isPrimary ? "" : "50px"};
  height: ${(props) => props.isPrimary ? "" : "50px"};
  padding: 5px;
  color: white;
  border: none;

  &&:hover {
    filter: brightness(0.9);
  }
`;