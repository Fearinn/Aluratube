import styled from "styled-components";
import config from "data/config.json";
import { useRouter } from "next/router";
import Link from "next/link";

interface ITimeline {
  search: string;
  children?: React.ReactNode;
}

export interface IPlaylist {
  jogos: Object[];
  "front-end": Object[];
  "back-end": Object[];
}

const StyledTimeline = styled.div`
  flex: 1;
  width: 100%;
  padding: 0 8px;
  overflow: hidden;
  h2 {
    font-size: 16px;
    margin-bottom: 16px;
    text-transform: capitalize;
  }
  img {
    aspect-ratio: 16/9;
    font-weight: 500;
    object-fit: cover;
    width: 100%;
    max-width: 210px;
    height: auto;
  }
  section {
    width: 100%;
    padding: 16px;
    overflow: hidden;
    .videos {
      width: calc(100vw - 16px * 4);
      display: grid;
      grid-gap: 16px;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      grid-auto-flow: column;
      grid-auto-columns: minmax(200px, 1fr);
      overflow-x: scroll;
      scroll-snap-type: x mandatory;
      padding-bottom: 1rem;
      color-scheme: ${({ theme }) => theme.scheme};

      & a {
        scroll-snap-align: start;
        span {
          padding-top: 8px;
          display: block;
          padding-right: 24px;
          color: ${({ theme }) => theme.textColorBase};
        }
      }
    }
  }
`;

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
                  const regex = new RegExp("(?<=v=).+");
                  const videoId = video.url.match(regex);
                  return (
                    <Link
                      href={{
                        pathname: `/video/`,
                        query: {
                          id: videoId && videoId[0],
                          title: video.title
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
