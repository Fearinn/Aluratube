import Head from "next/head";
import { useRouter } from "next/router";
import config from "config/config.json";
import styled from "styled-components";
import Timeline from "components/Timeline";
import { useContext } from "react";
import PlaylistsContext from "providers/PlaylistsContext";

const StyledVideo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  section:has(iframe) {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${({ theme }) => theme.backgroundLevel2};
    margin: 4rem 1rem 0 1rem;
    padding: 0.5rem;
    gap: 1rem;
    transition: 0.4s all linear;
    @media (min-width: 900px) {
      max-width: 50%;
    }

    h1 {
      text-align: center;
    }
  }
`;

function Video() {
  const router = useRouter();
  const { playlists } = useContext(PlaylistsContext);

  return (
    <>
      <Head>
        <title>{config.github} - AluraTube</title>
      </Head>
      <StyledVideo>
        <section>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${router.query.id}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <h1>{router.query.title}</h1>
        </section>
        <Timeline></Timeline>
      </StyledVideo>
    </>
  );
}

export default Video;
