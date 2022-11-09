import config from "data/config.json";
import styled from "styled-components";
import { CSSReset } from "components/CSSreset";
import Menu from "components/Menu/index";
import Timeline from "components/Timeline";
import { useState } from "react";
import Header from "components/Header";
import Favorites from "components/Favorites";

function HomePage() {
  const [search, setSearch] = useState("");
  return (
    <>
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
