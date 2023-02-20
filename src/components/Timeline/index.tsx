import { IPlaylists, ITimeline, IVideo } from "interfaces/timeline";
import Link from "next/link";
import { useRouter } from "next/router";
import PlaylistsContext from "providers/PlaylistsContext";
import { useContext, useEffect } from "react";
import videoService, { supabase } from "services/video";
import StyledTimeline from "./styles";


export const possiblePlaylists = ["jogos", "esportes", "tecnologia", "outros"];

const service = videoService();

function Timeline({ search }: ITimeline) {
  const { playlists, setPlaylists } = useContext(PlaylistsContext);
  const playlistNames = Object.keys(playlists);
  const router = useRouter();

 function updateVideos() {
    service.getAllVideos().then((resposta) => {
      const novasPlaylists = {} as IPlaylists;

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

  function renderSinglePlaylist() {
    const videos = playlists[router.query.playlist as keyof IPlaylists];
    return (
      <section
        id={router.query.playlist as string}
        key={router.query.playlist as string}
      >
        <h2>{`Mais vídeos da playlist "${router.query.playlist}"`}</h2>
        <div className="videos">
          {videos
            ?.filter((video) => video.youtubeId !== router.query.id)
            .map((video: IVideo) => {
              return (
                <Link
                  href={{
                    pathname: `/video/`,
                    query: {
                      id: video.youtubeId,
                      title: video.title.toUpperCase(),
                      playlist: possiblePlaylists.includes(video.playlist)
                        ? video.playlist
                        : "outros",
                    },
                  }}
                  key={video.youtubeId}
                >
                  <a>
                    <img src={video.thumb} alt="" />
                    <span>{video.title.toUpperCase()}</span>
                  </a>
                </Link>
              );
            })}
        </div>
      </section>
    );
  }

  return (
    <StyledTimeline>
      {!router.query.playlist
        ? playlistNames.map((playlistName) => {
            let countVideos = 0;

            const videos = playlists[playlistName as keyof IPlaylists];

            return (
              <section id={playlistName} key={playlistName}>
                <h2>{playlistName}</h2>
                <div className="videos">
                  {videos
                    ?.filter((video) => {
                      const normalizedTitle = video.title.toLowerCase();
                      if (search) {
                        const normalizedSearch = search.toLowerCase();
                        return normalizedTitle.includes(normalizedSearch);
                      } else {
                        return true;
                      }
                    })
                    .map((video) => {
                      countVideos += 1;
                      return (
                        <Link
                          href={{
                            pathname: `/video/`,
                            query: {
                              id: video.youtubeId,
                              title: video.title.toUpperCase(),
                              playlist: possiblePlaylists.includes(
                                video.playlist
                              )
                                ? video.playlist
                                : "outros",
                            },
                          }}
                          key={video.youtubeId}
                        >
                          <a>
                            <img src={video.thumb} />
                            <span>{video.title.toUpperCase()}</span>
                          </a>
                        </Link>
                      );
                    })}
                  {!countVideos && "Nenhum vídeo foi encontrado"}
                </div>
              </section>
            );
          })
        : renderSinglePlaylist()}
    </StyledTimeline>
  );
}

export default Timeline;
