import Timeline from "components/Timeline";
import React, { useContext } from "react";
import Header from "components/Header";
import Favorites from "components/Favorites";
import Head from "next/head";
import SearchContext from "providers/SearchContext";

function HomePage() {
  const { search } = useContext(SearchContext);

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
        <Header />
        <Timeline search={search}></Timeline>

        <Favorites />
      </div>
    </>
  );
}

export default HomePage;
