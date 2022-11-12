import { AppProps } from "next/app";
import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "data/themeConfig";
import ColorMode from "providers/ColorModeContext";
import Head from "next/head";
import Menu from "components/Menu";
import { CSSReset } from "providers/CSSreset";
import VideoRegister from "components/VideoRegister";
import SearchContext from "providers/SearchContext";

function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState("light");
  const [search, setSearch] = useState("");
  return (
    <>
      <Head>
        <link
          rel="icon"
          type="image/x-icon"
          href="https://icons.iconarchive.com/icons/dakirby309/simply-styled/128/YouTube-icon.png"
        ></link>
      </Head>
      <ColorMode.Provider value={{ theme, setTheme }}>
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
          <CSSReset />
          <GlobalStyles />
          <SearchContext.Provider value={{search, setSearch}}>
          <Menu />
          <Component {...pageProps} />
          </SearchContext.Provider>
          <VideoRegister/>
        </ThemeProvider>
      </ColorMode.Provider>
    </>
  );
}

export default App;
