import styled from "styled-components";

export const Container = styled.section`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;

  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const ModalContent = styled.section`
  padding: 10px;
  width: 700px;

  border-radius: 20px;

  background-color: #fff;
`;

export const ModalHeader = styled.header`
  display: flex;
  align-items: flex-end;
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
  margin: 10px;
`;