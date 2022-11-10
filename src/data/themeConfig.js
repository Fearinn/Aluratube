import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  backgroundBase: "#F9F9F9",
  backgroundLevel1: "#FFFFFF",
  backgroundLevel2: "#F0F0F0",
  borderBase: "#E5E5E5",
  background: "#363537",
  textColorBase: "#222222",
};

export const darkTheme = {
  backgroundBase: "#181818",
  backgroundLevel1: "#202020",
  backgroundLevel2: "#313131",
  borderBase: "#383838",
  background: "#999",
  textColorBase: "#FFFFFF",
};

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.backgroundBase};
    color: ${({ theme }) => theme.textColorBase};
    transition: all 0.50s linear;
  }
`;
