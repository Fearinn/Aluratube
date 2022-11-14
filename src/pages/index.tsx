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

const PROJECT_URL = "https://szaruafpiauzxitymguy.supabase.co";
const PUBLIC_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6YXJ1YWZwaWF1enhpdHltZ3V5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyMjE4NDgsImV4cCI6MTk4Mzc5Nzg0OH0.t0Bfs0pKt2LtGwQb5BE9AB7OoK8hWkdsNs5wqvzHSak";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

function HomePage() {
  const { playlists, setPlaylists } = useContext(PlaylistsContext);
  const { search } = useContext(SearchContext);
  const service = videoService();

  function updateVideos() {
    service.getAllVideos().then((resposta) => {
      const novasPlaylists = {} as IPlaylists;
      const possiblePlaylists = ["jogos", "esportes", "tecnologia", "outros"];

      resposta.data?.forEach((video) => {
        const playlist = video.playlist as keyof IPlaylists;

        if (!novasPlaylists[playlist] && possiblePlaylists.includes(playlist)) {
          novasPlaylists[playlist] = [];
          novasPlaylists[playlist] = [
            video,
            ...(novasPlaylists[playlist] as IVideo[]),
          ];
        } else if (!novasPlaylists[playlist] && novasPlaylists["outros"]) {
          novasPlaylists["outros"] = [
            video,
            ...(novasPlaylists["outros"] as IVideo[]),
          ];
        } else if (novasPlaylists[playlist]) {
          novasPlaylists[playlist] = [
            video,
            ...(novasPlaylists[playlist] as IVideo[]),
          ];
        }
      });
      setPlaylists(novasPlaylists);
    });
  }

  useEffect(() => {
    supabase
      .from("video")
      .on("*", () => updateVideos())
      .subscribe();
  }, []);

  useEffect(() => {
    updateVideos();
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
        <Timeline playlists={playlists} search={search}></Timeline>

        <Favorites />
      </div>
    </>
  );
}

export default HomePage;
