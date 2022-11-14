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
  esportes?: IVideo[];
  outros?: IVideo[];
}

interface IVideo {
  title: string;
  url: string;
  playlist: string;
  thumb: string;
  id: number;
}

function HomePage() {
  const service = videoService();
  const [playlists, setPlaylists] = useState({});
  const { search } = useContext(SearchContext);

  useEffect(() => {
    service.getAllVideos().then((resposta) => {
      const novasPlaylists = {} as IPlaylists;
      resposta.data?.forEach((video) => {
        const playlist = video.playlist as keyof IPlaylists;
        const possiblePlaylists = ["jogos", "esportes", "tecnologia", "outros"];
        if (!novasPlaylists[playlist] && possiblePlaylists.includes(playlist)) {
          novasPlaylists[playlist] = [];
          novasPlaylists[playlist] = [
            ...(novasPlaylists[playlist] as IVideo[]),
            video,
          ];
        } else if (!novasPlaylists[playlist] && novasPlaylists["outros"]) {
          novasPlaylists["outros"] = [
            ...(novasPlaylists["outros"] as IVideo[]),
            video,
          ];
        } else if (novasPlaylists[playlist]) {
          novasPlaylists[playlist] = [
            ...(novasPlaylists[playlist] as IVideo[]),
            video,
          ];
        }
      });

      setPlaylists(novasPlaylists);
    });
  }, [playlists]);

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
