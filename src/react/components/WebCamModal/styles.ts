import styled from "styled-components";
import { fadeIn } from "../../UI/GlobalStyle";

export const Container = styled.section`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;

  background-color: rgba(0, 0, 0, 0.5);
  animation: ${fadeIn} 0.1s ease-in-out;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const ModalContent = styled.section`
  padding: 10px;
  width: 60%;
  height: 90%;

  border-radius: 20px;

  background-color: #fff;
`;

export const ModalHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: row;
`;

export const ModalBody = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  padding: 10px;
  width: 100%;
`;

export const CloseButton = styled.button`
  height: 30px;
  width: 30px;

  text-align: center;

  float: right;
`;

export const Picture = styled.img`
  border-radius: 5px;
  margin: 10px;

  height: 90%;
  max-width: 200px;
`;

export const Preview = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.1s ease-in-out;

  margin: 10px;
  max-height: 300px;
  height: 60%;
  width: 50%;
  padding: 30px;
`;

export const PreviewHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;