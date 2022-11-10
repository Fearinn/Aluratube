
import styledComponent from "styled-components"
import config from "data/config.json"

const StyledHeader = styledComponent.div`
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .user-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 4rem;
    width: 100%;
  }
`;

function Header() {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${config.bg})`,
          backgroundSize: "100%",
          height: "300px",
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

export default Header
