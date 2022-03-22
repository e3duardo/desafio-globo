import { Container } from "react-bootstrap";
import { FooterBar } from "./styles";

function Footer() {
  return (
    <FooterBar>
      <Container>
        <h2>Desafio Globo</h2>
        <div>© Copyright março de 2022 Eduardo Santos</div>
      </Container>
    </FooterBar>
  );
}

export default Footer;
