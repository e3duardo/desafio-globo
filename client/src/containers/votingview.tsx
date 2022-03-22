import { useState, useEffect, useRef } from "react";
import { Container, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

import { brotherDetail } from "../services/brother";
import { vote } from "../services/vote";
import { BrotherType } from "../services/types";
import Loading from "../components/loading";

function VotingView() {
  const siteKey = '6LdWbv0eAAAAABLuVrtuOEryaSAPb0Gwo65m8BRn';
  const recaptchaRef = useRef<any>(null);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [brother, setBrother] = useState<BrotherType | null>(null);

  useEffect(() => {
    brotherDetail(id as string).then(brother => {
      setBrother(brother);
    });
  }, [])

  async function handleVote() {
    // const captchaToken = await recaptchaRef.current.executeAsync();
    const captchaToken = recaptchaRef.current.getValue();
    recaptchaRef.current.reset();

    await vote(id as string, captchaToken as string);
    return navigate("/");
  }

  if (!brother) {
    return <Loading />;
  }

  return (
    <>
      <Container>
        <h2>{brother.name}</h2>
        <p>{brother.resume}</p>
        {/* <Button variant="primary" >Eliminar</Button> */}

        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={siteKey}
        />
        { /* size="invisible"  */}

        <Button className='btn btn-primary mt-3' onClick={handleVote}>Confirme</Button>
      </Container>
    </>
  );
}

export default VotingView;
