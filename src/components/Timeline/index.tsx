import Link from "next/link";
import getIdFromURL from "utils/getIdFromURL";
import StyledTimeline from "./styles";

interface ITimeline {
  search: string;
  playlists: Object;
  children?: React.ReactNode;
}

interface IVideo {
  title: string;
  url: string;
  playlist: string;
  thumb: string;
  id: number;
}

function Timeline({ search, playlists }: ITimeline) {
  const playlistNames = Object.keys(playlists);
  return (
    <StyledTimeline>
      {playlistNames.map((playlistName, index) => {
        /*  @ts-ignore */
        const videos = playlists[playlistName];
        let countVideos = 0
        return (
          <section key={index}>
            <h2>{playlistName}</h2>
            <div className="videos">
              {videos
                .filter((video: IVideo) => {
                  const normalizedTitle = video.title.toLowerCase();
                  const normalizedSearch = search.toLowerCase();
                  return normalizedTitle.includes(normalizedSearch);
                })
                .map((video: IVideo) => {
                  countVideos += 1
                  return (
                    <Link
                      href={{
                        pathname: `/video/`,
                        query: {
                          id: getIdFromURL(video.url),
                          title: video.title.toUpperCase(),
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
      })}
    </StyledTimeline>
  );
}

export default Timeline;
function getVideoId(video: {
  title: string;
  url: string;
  thumb: string;
}):
  | string
  | number
  | boolean
  | readonly string[]
  | readonly number[]
  | readonly boolean[]
  | null
  | undefined {
  throw new Error("Function not implemented.");
}
