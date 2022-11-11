
import config from "data/config.json";
import StyledFavorites from "./styles"

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
