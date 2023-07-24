import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
  }

  body {
    margin: 0;
    background-color: gainsboro;
    font-size: 18px;
    
  }
`;
