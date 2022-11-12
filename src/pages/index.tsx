import Timeline from "components/Timeline";
import React, { useContext, useEffect, useState } from "react";
import Header from "components/Header";
import Favorites from "components/Favorites";
import Head from "next/head";
import SearchContext from "providers/SearchContext";
import videoService from "services/video";

interface IPlaylists {
  jogos?: IVideo[];
  tecnologia?: IVideo[];
  esporte?: IVideo[];
  outro?: IVideo[];
}

interface IVideo {
  title: string;
  url: string;
  playlist: string;
  thumb: string;
}

function HomePage() {
  const service = videoService();
  const [playlists, setPlaylists] = useState({});
  const { search } = useContext(SearchContext)

  useEffect(() => {
    console.log("useEffect");
    service.getAllVideos().then((resposta) => {
      console.log(resposta.data);
      const novasPlaylists = {} as IPlaylists;
      resposta.data?.forEach((video) => {
        const playlist = video.playlist as keyof IPlaylists;
        if (!novasPlaylists[playlist]) novasPlaylists[playlist] = [];
        novasPlaylists[playlist] = [
          video,
          /* @ts-ignore */
          ...novasPlaylists[playlist],
        ];
      });
      setPlaylists(novasPlaylists);
    });
  }, []);

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
        <Timeline playlists={playlists} search={search}>
          Conteúdo
        </Timeline>

        <Favorites />
      </div>
    </>
  );
}

export default HomePage;
