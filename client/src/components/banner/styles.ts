import { Link } from "react-router-dom";
import styled from "styled-components";

import backgroundVotacao from "../../assets/bbb-background-votacao-desktop.png";

export const Container = styled.div`
  background: url(${backgroundVotacao}) no-repeat center center;
  background-size: cover;
  height: 570px;
  margin-bottom: 60px;
  border-radius: 1rem;
  position: relative;
`;

interface BrothersImagesProps {
  count: number;
}

export const BrothersImages = styled.div<BrothersImagesProps>`
  display: flex;
  justify-content: center;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 148px;

  .background {
    margin: 10px;
    margin-bottom: 0%;
    background: #fff;
    padding: 100px 50px 0 50px;
    div {
      display: inline-block;
      width: ${(props) => 1100 / props.count}px;
      overflow: hidden;

      img {
        margin-left: -10%;
        width: 120%;
      }
    }
  }
`;

export const Botao1 = styled(Link)`
  border-radius: 10px;
  padding: 8px 16px;
  background: #5001b3;
  border: transparent;
  font-weight: bold;
  color: #fff;
  position: absolute;
  font-size: 2rem;
  left: 30px;
  bottom: 90px;
  :hover {
    color: #fff;
  }
`;

export const Botao2 = styled(Link)`
  border-radius: 40px;
  padding: 10px 30px;
  background: #fff;
  color: rgb(17, 17, 17);
  border: transparent;
  font-weight: bold;
  position: absolute;
  left: 30px;
  bottom: 30px;
`;
