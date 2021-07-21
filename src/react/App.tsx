import { GlobalStyle } from './UI/GlobalStyle';
import "./UI/index.global.css";

import { Home } from './components/Home';

export function App () {
  return (
    <>
      <GlobalStyle />
      <Home />
    </>
  )
}