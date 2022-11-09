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
          backgroundImage: `url("https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZ3JhbW1pbmd8ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60)`,
          backgroundSize: "100%",
          height: "250px",
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
