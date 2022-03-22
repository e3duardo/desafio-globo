import { HeaderBar } from "./styles";
import { ReactComponent as GShow } from "../../assets/gshow1.svg";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../authprovider";

function BigBrotherHeader() {
  let auth = useAuth();

  return (
    <HeaderBar>
      <Container>
        <GShow />
        <Link to="/">
          <h1>Big Brother Brasil</h1>
        </Link>
        <div className="dummy">
          {auth.user && (
            <button
              className="btn btn-link text-white"
              onClick={() => auth.signout(() => {})}
            >
              Sair
            </button>
          )}
        </div>
      </Container>
    </HeaderBar>
  );
}

export default BigBrotherHeader;
