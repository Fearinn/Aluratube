import { IPlaylists, ITimeline, IVideo } from "interfaces/timeline";
import Link from "next/link";
import { useRouter } from "next/router";
import { possiblePlaylists } from "pages";
import getIdFromURL from "utils/getIdFromURL";
import StyledTimeline from "./styles";

function Timeline({ search, playlists }: ITimeline) {
  const playlistNames = Object.keys(playlists);
  const router = useRouter();

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
            ?.filter((video) => getIdFromURL(video.url) !== router.query.id)
            .map((video: IVideo) => {
              return (
                <Link
                  href={{
                    pathname: `/video/`,
                    query: {
                      id: getIdFromURL(video.url),
                      title: video.title.toUpperCase(),
                      playlist: possiblePlaylists.includes(video.playlist)
                        ? video.playlist
                        : "outros",
                    },
                  }}
                  key={video.id}
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
                    ?.filter((video: IVideo) => {
                      const normalizedTitle = video.title.toLowerCase();
                      if (search) {
                        const normalizedSearch = search.toLowerCase();
                        return normalizedTitle.includes(normalizedSearch);
                      } else {
                        return true;
                      }
                    })
                    .map((video: IVideo) => {
                      countVideos += 1;
                      return (
                        <Link
                          href={{
                            pathname: `/video/`,
                            query: {
                              id: getIdFromURL(video.url),
                              title: video.title.toUpperCase(),
                              playlist: possiblePlaylists.includes(
                                video.playlist
                              )
                                ? video.playlist
                                : "outros",
                            },
                          }}
                          key={video.id}
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
