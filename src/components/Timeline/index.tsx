import Link from "next/link";
import getIdFromURL from "utils/getIdFromURL";
import StyledTimeline from "./styles";

interface ITimeline {
  search?: string;
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
  const playlistNames = Object.keys(playlists)
  return (
    <StyledTimeline>
      {playlistNames.map((playlistName) => {
        /*  @ts-ignore */
        const videos = playlists[playlistName];
        let countVideos = 0
        return (
          <section id={playlistName} key={playlistName}>
            <h2>{playlistName}</h2>
            <div className="videos">
              {videos
                .filter((video: IVideo) => {
                  const normalizedTitle = video.title.toLowerCase();
                  if (search) {
                  const normalizedSearch = search.toLowerCase();
                  return normalizedTitle.includes(normalizedSearch);
                  } else {
                    return true
                  }
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
                          playlist: video.playlist
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

