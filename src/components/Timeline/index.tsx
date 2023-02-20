import { IPlaylists, ITimeline, IVideo } from "interfaces/timeline";
import Link from "next/link";
import { useRouter } from "next/router";
import PlaylistsContext from "providers/PlaylistsContext";
import { useContext, useEffect } from "react";
import videoService, { supabase } from "services/video";
import StyledTimeline from "./styles";

export const possiblePlaylists = ["jogos", "esportes", "tecnologia", "outros"];

let alreadyMounted = false;

const service = videoService();

function isPlaylist(playlist: unknown[] | IVideo[]): playlist is IVideo[] {
  return (playlist[0] as IVideo).youtubeId !== undefined;
}

function Timeline({ search }: ITimeline) {
  const { playlists, setPlaylists } = useContext(PlaylistsContext);
  const playlistNames = Object.keys(playlists);
  const router = useRouter();

  function updateVideos() {
    service.getAllVideos().then((resposta) => {
      const novasPlaylists: IPlaylists = {};

      if (!resposta.data || !isPlaylist(resposta.data)) return;

      resposta.data.forEach((video) => {
        const nomeDaPlaylist = video.playlist as keyof IPlaylists;

        if (
          novasPlaylists[nomeDaPlaylist] &&
          !isPlaylist(novasPlaylists[nomeDaPlaylist]!)
        )
          return;

        if (
          !novasPlaylists[nomeDaPlaylist] &&
          possiblePlaylists.includes(nomeDaPlaylist) &&
          !novasPlaylists[nomeDaPlaylist]
        ) {
          novasPlaylists[nomeDaPlaylist] = [video];
          return;
        }

        if (
          !novasPlaylists[nomeDaPlaylist] &&
          novasPlaylists["outros"] &&
          !novasPlaylists["outros"].includes(video)
        ) {
          novasPlaylists["outros"] = [video, ...novasPlaylists["outros"]];
          return;
        }

        if (
          novasPlaylists[nomeDaPlaylist] &&
          !novasPlaylists[nomeDaPlaylist]?.includes(video)
        ) {
          novasPlaylists[nomeDaPlaylist] = [
            video,
            ...novasPlaylists[nomeDaPlaylist]!,
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

    if (alreadyMounted) return;
    alreadyMounted = true;
    updateVideos();
  }, []);

  function renderSinglePlaylist() {
    const videos = playlists[router.query.playlist as keyof IPlaylists];
    if (typeof router.query.playlist !== "string") return <></>
    return (
      <section id={router.query.playlist} key={router.query.playlist}>
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
