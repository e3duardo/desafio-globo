import { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

import { brotherDetail } from "../services/brother";
import { vote } from "../services/vote";
import { BrotherType } from "../services/types";
import Loading from "../components/loading";

function VotingView() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [brother, setBrother] = useState<BrotherType | null>(null);

  useEffect(() => {
    brotherDetail(id as string).then(brother => {
      setBrother(brother);
    });
  }, [])

  async function handleVote() {
    await vote(id as string);
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
        <Button className='btn btn-primary' onClick={handleVote}>Confirme</Button>
      </Container>
    </>
  );
}

export default VotingView;
