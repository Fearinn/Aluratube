import styled from "styled-components";
import config from "data/config.json"

const StyledHeader = styled.div`
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
          backgroundImage: `url("https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80")`,
          backgroundSize: "100%",
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

export default Header
