import styled from "styled-components";
import config from "data/config.json";

interface ITimeline {
  playlists: typeof config.playlists;
  search: string;
  // theme: Object;
  children?: React.ReactNode;
}

interface IPlaylist {
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
    div {
      width: calc(100vw - 16px * 4);
      display: grid;
      grid-gap: 16px;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      grid-auto-flow: column;
      grid-auto-columns: minmax(200px, 1fr);
      overflow-x: scroll;
      scroll-snap-type: x mandatory;
      a {
        scroll-snap-align: start;
        span {
          padding-top: 8px;
          display: block;
          padding-right: 24px;
          color: ${({ theme }) => theme.textColorBase || "#222222"};
        }
      }
    }
  }
`;

function Timeline({ playlists, search}: ITimeline) {
  const playlistNames = Object.keys(playlists);
  return (
    <StyledTimeline>
      {playlistNames.map((playlistName, index) => {
        const videos = playlists[playlistName as keyof IPlaylist];
        return (
          <section key={index}>
            <h2>{playlistName}</h2>
            <div>
              {videos
                .filter((video) => {
                  const normalizedTitle = video.title.toLowerCase();
                  const normalizedSearch = search.toLowerCase();
                  return normalizedTitle.includes(normalizedSearch);
                })
                .map((video, key) => {
                  return (
                    <a href={video.url} key={key}>
                      <img src={video.thumb} />
                      <span>{video.title}</span>
                    </a>
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
