import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  scheme: "light",
  backgroundBase: "#F9F9F9",
  backgroundLevel1: "#FFFFFF",
  backgroundLevel2: "#F0F0F0",
  borderBase: "#E5E5E5",
  textColorBase: "#222222",
  banner: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
};

export const darkTheme = {
  scheme: "dark",
  backgroundBase: "#181818",
  backgroundLevel1: "#202020",
  backgroundLevel2: "#313131",
  borderBase: "#383838",
  textColorBase: "#FFFFFF",
  banner: "https://images.unsplash.com/photo-1504805572947-34fad45aed93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
};

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.backgroundBase};
    color: ${({ theme }) => theme.textColorBase};
    transition: all 0.4s linear;
  }
`;
