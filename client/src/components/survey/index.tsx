import { useMemo, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { apiUrl } from "../../services/base";
import { BrotherType, SurveyType } from "../../services/types";
import Brother from "../brother";

type SurveyProps = {
  survey: SurveyType;
};

function Survey({ survey }: SurveyProps) {
  const [brother, setBrother] = useState<BrotherType | null>(null);

  const brotherNames = useMemo(() => {
    const names = survey.brothers.map((brother) => brother.name);
    const lastName = names.pop();

    return `${names.join(", ")} ou ${lastName}`;
  }, [survey]);

  function handleVote(brother: BrotherType) {
    setBrother(brother);
  }
  function handleReset() {
    setBrother(null);
  }

  return (
    <>
      <Row className="justify-content-center">
        <Col xs={6} className="pt-4 pb-3">
          {!brother ? (
            <>
              <h2 className="fs-1 fw-bold">
                Paredão do BBB22: Vote para eliminar. {brotherNames}?
              </h2>

              {survey.brothers.map((brother) => (
                <Brother
                  key={brother.id}
                  brother={brother}
                  voted={handleVote}
                />
              ))}
            </>
          ) : (
            <>
              <div className="d-flex align-items-end mb-3 justify-content-between">
                <div>
                  <h5>👍🏻 Você votou em </h5>
                  <h2>{brother.name}</h2>
                </div>
                <img src={`${apiUrl}${brother.avatar}`} alt={brother.name} />
              </div>

              <div className="d-grid">
                <button
                  className="btn btn-primary"
                  style={{
                    background: "#5001b3",
                    borderRadius: 4,
                    border: "transparent",
                  }}
                  onClick={handleReset}
                >
                  Votar novamente
                </button>
              </div>
            </>
          )}
        </Col>
      </Row>
    </>
  );
}

export default Survey;
