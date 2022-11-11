
import config from "data/config.json";
import StyledHeader from "./styles"

function Header() {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${config.bg})`,
          backgroundSize: "100%",
          backgroundRepeat: "no-repeat",
          height: "230px",
          margin: "0 auto",
          width: "100%",
        }}
      />
      <StyledHeader>
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
