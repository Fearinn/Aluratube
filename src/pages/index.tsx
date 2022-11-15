import Timeline from "components/Timeline";
import React, { useContext, useEffect, useState } from "react";
import Header from "components/Header";
import Favorites from "components/Favorites";
import Head from "next/head";
import SearchContext from "providers/SearchContext";
import videoService from "services/video";
import { IPlaylists, IVideo } from "interfaces/timeline";
import PlaylistsContext from "providers/PlaylistsContext";
import { createClient } from "@supabase/supabase-js";


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
