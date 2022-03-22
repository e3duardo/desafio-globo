import { Form, Container, Button, Alert, Row, Col } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../authprovider";

function LoginView() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  let from = (location.state as any)?.from?.pathname || "/";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let email = formData.get("email") as string;
    let password = formData.get("password") as string;

    auth.signin({ email, password }, () => {
      navigate(from, { replace: true });
    });
  }

  return (
    <Container>
      <Row className="d-flex justify-content-center p-3">
        <Col xs={3}>
          <p>Faça login para continuar</p>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="name@example.com"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Senha"
              />
            </Form.Group>

            {auth.error !== "" ? (
              <Alert variant="warning">{auth.error}</Alert>
            ) : null}

            <Button variant="primary" type="submit">
              Entrar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginView;
