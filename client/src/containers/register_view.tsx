import { Form, Container, Button, Alert, Row, Col } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as ContaGlobo } from "../assets/conta-globo.svg";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef, useState } from "react";
import { useAuth } from "../authprovider";
import { register } from "../services/user";

function RegisterView() {
  const siteKey = "6LdWbv0eAAAAABLuVrtuOEryaSAPb0Gwo65m8BRn";
  const recaptchaRef = useRef<any>(null);

  let navigate = useNavigate();
  const [error, setError] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let name = formData.get("name") as string;
    let email = formData.get("email") as string;
    let password = formData.get("password") as string;
    let password_confirmation = formData.get("password_confirmation") as string;

    const user = await register({ name, email, password, password_confirmation });

    if(user){
      navigate('/login', { replace: true });
    }else{
      setError('Verifique seus dados!')
    }
  }

  return (
    <Container>
      <Row className="d-flex justify-content-center p-3">
        <Col xs={4}>
          <div className="text-center">
            <ContaGlobo />
            <p className="fw-lighter mt-2">
              Crie a sua conta única para todos os produtos Globo
            </p>
          </div>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" name="name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>E-mail</Form.Label>
              <Form.Control type="email" name="email" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Senha</Form.Label>
              <Form.Control type="password" name="password" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Confirmação de senha</Form.Label>
              <Form.Control
                type="password"
                name="password_confirmation"
                required
              />
            </Form.Group>

            {error !== "" ? (
              <Alert variant="warning">{error}</Alert>
            ) : null}

            <div className="d-flex justify-content-center mt-4 mb-4">
              <ReCAPTCHA ref={recaptchaRef} sitekey={siteKey} />
            </div>

            <div className="form-check fs-7 mb-5">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="fakeField"
                required
              />
              <label className="form-check-label" htmlFor="fakeField">
                Li e concordo com os{" "}
                <a href="#" className="text-secondary">
                  Termos de Uso
                </a>{" "}
                e{" "}
                <a href="#" className="text-secondary">
                  Política de Privacidade
                </a>
                .
              </label>
            </div>

            <div className="d-grid">
              <Button variant="secondary" type="submit">
                CADASTRAR
              </Button>
            </div>

            <p className="text-center fw-light pt-3">
              Já tem conta?{" "}
              <Link to="/login" className="fw-bold text-secondary">
                ENTRE
              </Link>
              .
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default RegisterView;
