import styled from "styled-components";
import config from "data/config.json";

const StyledFavorites = styled.div`
  padding: 0 1rem 0.5rem 1rem;

  h1 {
    padding: 1rem 0;
  }

  a {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
    h2 {
      color: black;
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

function Favorites() {
  const favorites = config.favorites;
  return (
    <StyledFavorites>
      <h1>Favoritos</h1>
      <div className="profiles-list">
        {favorites.map((favorite, key) => (
          <a
            key={key}
            aria-labelledby={favorite.github}
            target="blank"
            href={favorite.link}
          >
            <img src={`https://github.com/${favorite.github}.png`} alt="" />
            <h2 id={favorite.github}>{favorite.name}</h2>
          </a>
        ))}
      </div>
    </StyledFavorites>
  );
}

export default Favorites;
