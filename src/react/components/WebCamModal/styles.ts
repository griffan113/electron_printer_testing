import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
    0% { opacity: 0; }
    100% { opacity: 1; } 
`

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
`

export const ModalContent = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100%;

  border-radius: 10px;

  background-color: #fff;
`

/* export const ModalBody = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  padding: 10px;
  width: 100%;
`
 */
