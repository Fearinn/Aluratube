import Head from "next/head";
import { useRouter } from "next/router";
import config from "data/config.json";
import styled from "styled-components";
import Timeline from "components/Timeline";
import { useState } from "react";

const StyledVideo = styled.section`
  display: flex;
  flex-direction: column-reverse;
  align-self: start;
  align-items: center;
  background-color: ${({ theme }) => theme.backgroundLevel2};
  margin: 4rem 1rem;
  padding: 1rem;
  gap: 1rem;
  flex-grow: 1;
  @media (min-width: 900px) {
    max-width: 50%;
  }

  h1 {
    text-align: center;
  }
`;

function Video() {
  const router = useRouter();
  const playlists = useState({})
  return (
    <>
      <Head>
        <title>{config.github} - AluraTube</title>
      </Head>
      <StyledVideo>
        <h1>{router.query.title}</h1>
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${router.query.id}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </StyledVideo>
    </>
  );
}

export default Video;
