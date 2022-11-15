import config from "config/config.json";
import StyledHeader from "./styles";

function Header() {
  return (
    <>
      <StyledHeader>
        <div className="banner" />
        <section className="user-info">
          <img src={`https://github.com/${config.github}.png`} alt="" />
          <div>
            <h2 style={{ marginBottom: "0.5rem" }}>{config.name}</h2>
            <p>{config.job}</p>
          </div>
        </section>
      </StyledHeader>
    </>
  );
}

export default Header;
