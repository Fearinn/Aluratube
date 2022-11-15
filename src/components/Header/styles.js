import styled from "styled-components";

const StyledHeader = styled.div`
  .banner {
    background-image: url(${({ theme }) => theme.banner});
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center;
    height: 300px;
    width: 100%;
    transition: 0.2s all linear;
  }
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

export default StyledHeader;
