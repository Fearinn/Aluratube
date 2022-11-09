import config from "data/config.json";
import { CSSReset } from "components/CSSreset";
import Menu from "components/Menu/index";
import Timeline from "components/Timeline";
import { useState } from "react";
import Header from "components/Header";
import Favorites from "components/Favorites";
import Head from "next/head"

function HomePage() {
  const [search, setSearch] = useState("");
  return (
    <>
    <Head>
      <title>Home - AluraTube</title>
      <link rel="icon" type="image/x-icon" href="https://icons.iconarchive.com/icons/dakirby309/simply-styled/128/YouTube-icon.png"></link>
    </Head>
      <CSSReset />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <Menu search={search} setSearch={setSearch} />
        <Header />
        <Timeline playlists={config.playlists} search={search}>
          Conteúdo
        </Timeline>
        <Favorites />
      </div>
    </>
  );
}

export default HomePage;
