import Menu from "components/Menu/index";
import Timeline from "components/Timeline";
import React, { useState } from "react";
import Header from "components/Header";
import Favorites from "components/Favorites";
import Head from "next/head";
import SearchContext from "providers/SearchContext";

function HomePage() {
  const [search, setSearch] = useState("");

  return (
    <>
      <Head>
        <title>Home - AluraTube</title>
      </Head>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <SearchContext.Provider value={{search, setSearch}}>
          <Header />
          <Timeline search={search}>
            Conteúdo
          </Timeline>
        </SearchContext.Provider>
        <Favorites />
      </div>
    </>
  );
}

export default HomePage;
