import styled from "styled-components";

const StyledFavorites = styled.div`
  padding: 0 1rem 0.5rem 1rem;

  h1 {
    font-size: 1.5rem;
    padding: 1rem 0;
  }

  a {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
    h2 {
      font-size: 1rem;
      color: ${({theme}) => theme.textColorBase};
    }
    img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
    }
  }

  .profiles-list {
    display: flex;
    gap: 2rem;
  }
`;

export default StyledFavorites