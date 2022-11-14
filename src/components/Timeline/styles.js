import styled from "styled-components";

const StyledTimeline = styled.div`
display: flex;
flex-direction: column;
  flex: 1;
  width: 100%;
  padding: 0 8px;
  overflow: hidden;
  h2 {
    font-size: 16px;
    margin-bottom: 16px;
    &::first-letter {
      text-transform: capitalize;
    }
  }
  img {
    aspect-ratio: 16/9;
    font-weight: 500;
    object-fit: cover;
    width: 100%;
    max-width: 210px;
    height: auto;
  }
   #outros {
    order: 1;
  }

  section {
    width: 100%;
    padding: 16px 4px;
    overflow: hidden;
    background-color: ${({theme}) => theme.backgroundLevel1};
    transition: all 0.3s linear;
    .videos {
      width: calc(100vw);
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

export default StyledTimeline;
