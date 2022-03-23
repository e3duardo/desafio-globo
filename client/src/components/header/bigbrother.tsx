import { HeaderBar } from "./styles";
import { ReactComponent as GShow } from "../../assets/gshow1.svg";
import { Container, Dropdown, DropdownButton } from "react-bootstrap";
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

        {auth.user ? (
          <DropdownButton
            variant="primary"
            title={auth.user.name}
            id="input-group-dropdown-1"
          >
            <Dropdown.Item href="#" onClick={() => auth.signout(() => {})}>
              Sair
            </Dropdown.Item>
          </DropdownButton>
        ) : (
          <Link to="/login" className="btn btn-primary">
            Logar
          </Link>
        )}
      </Container>
    </HeaderBar>
  );
}

export default BigBrotherHeader;
