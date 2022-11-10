import { AppProps } from "next/app";
import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "data/themeConfig";
import ColorMode from "ColorModeContext";
import Head from "next/head";


function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState("light");
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
        <GlobalStyles />
        <Component {...pageProps} />
      </ThemeProvider>
    </ColorMode.Provider>
    </>
  );
}

export default App;
