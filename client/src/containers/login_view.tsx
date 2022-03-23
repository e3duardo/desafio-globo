import { Form, Container, Button, Alert, Row, Col } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../authprovider";
import { ReactComponent as ContaGlobo } from "../assets/conta-globo.svg";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";

function LoginView() {
  const siteKey = "6LdWbv0eAAAAABLuVrtuOEryaSAPb0Gwo65m8BRn";
  const recaptchaRef = useRef<any>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const from = (location.state as any)?.from?.pathname || "/";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    auth.signin({ email, password }, (user) => {
      let route = user?.role === "backstage" ? "/producao/dashboard" : from;
      console.log(route);
      route = route === '/login' ? '/' : route;

      navigate(route, { replace: true });
    });
  }

  return (
    <Container>
      <Row className="d-flex justify-content-center p-3">
        <Col xs={4}>
          <div className="text-center">
            <ContaGlobo />
            <p className="fw-lighter mt-2">
              Uma só conta para todos os produtos Globo
            </p>
          </div>

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

            <div className="d-flex justify-content-center mt-4 mb-4">
              <ReCAPTCHA ref={recaptchaRef} sitekey={siteKey} />
            </div>

            <div className="d-grid">
              <Button variant="secondary" type="submit">
                Entrar
              </Button>
            </div>

            <p className="text-center fw-light pt-3">
              Não tem conta?{" "}
              <Link to="/cadastro" className="fw-bold text-secondary">
                CADASTRE-SE
              </Link>
              .
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginView;
