import config from "data/config.json";
import Link from "next/link";
import getIdFromURL from "utils/getIdFromURL"
import StyledTimeline from "./styles"


interface ITimeline {
  search: string;
  children?: React.ReactNode;
}

export interface IPlaylist {
  jogos: Object[];
  "front-end": Object[];
  "back-end": Object[];
}


function Timeline({ search }: ITimeline) {
  const playlists = config.playlists;
  const playlistNames = Object.keys(playlists);
  return (
    <StyledTimeline>
      {playlistNames.map((playlistName, index) => {
        const videos = playlists[playlistName as keyof IPlaylist];
        return (
          <section key={index}>
            <h2>{playlistName}</h2>
            <div className="videos">
              {videos
                .filter((video) => {
                  const normalizedTitle = video.title.toLowerCase();
                  const normalizedSearch = search.toLowerCase();

                  return normalizedTitle.includes(normalizedSearch);
                })
                .map((video) => {
                  return (
                    <Link
                      href={{
                        pathname: `/video/`,
                        query: {
                          id: getIdFromURL(video.url),
                          title: video.title,
                        },
                      }}
                      key={video.url}
                    >
                      <a>
                        <img src={video.thumb} />
                        <span>{video.title}</span>
                      </a>
                    </Link>
                  );
                })}
            </div>
          </section>
        );
      })}
    </StyledTimeline>
  );
}

export default Timeline;
function getVideoId(video: { title: string; url: string; thumb: string; }): string | number | boolean | readonly string[] | readonly number[] | readonly boolean[] | null | undefined {
  throw new Error("Function not implemented.");
}

