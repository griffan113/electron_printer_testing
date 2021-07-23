import { createGlobalStyle, keyframes } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    color: #393939;
  }

  button {
    outline: none;
  }
`;

export const fadeIn = keyframes`
    0% { opacity: 0; }
    100% { opacity: 1; } 
`;
