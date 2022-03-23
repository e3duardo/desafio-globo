import { useCallback, useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import Survey from "../components/survey";
import { SurveyType } from "../services/types";
import { publicSurvey } from "../services/public-survey";
import Loading from "../components/loading";
import EmptySurvey from "../components/survey/empty";
import { apiUrl } from "../services/base";

function BackstageView() {
  const [survey, setSurvey] = useState<SurveyType | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPublicSurvey();
  }, []);

  useCallback((brotherId) => {
    loadPublicSurvey();
  }, []);

  async function loadPublicSurvey() {
    try {
      setLoading(true);
      const survey = await publicSurvey();
      setSurvey(survey);
    } finally {
      setLoading(false);
    }
  }

  if (loading && !survey) return <Loading />;
  if (!survey) return <EmptySurvey />;

  return (
    <>
      <Container>
        <div className="row mt-5 mb-4">
          <div className="col">
            <div
              className="card text-white bg-success mb-3"
              style={{ maxWidth: "18rem" }}
            >
              <div className="card-body">
                <h5 className="card-title">Total de votos</h5>
                <p className="card-text fs-1">{survey.total_votes}</p>
              </div>
            </div>
          </div>
          {survey.brothers.map((brother) => (
            <div className="col" key={brother.id}>
              <div
                className="card text-white bg-secondary mb-3"
                style={{ maxWidth: "18rem" }}
              >
                <div className="card-body">
                  <h5 className="card-title">Votos para {brother.name}</h5>
                  <p className="card-text fs-1 mb-0">
                    {
                      survey.total_votes_per_brother.find(
                        (vote) => vote.brother_id === brother.id
                      )?.total_votes
                    }
                  </p>
                  <img
                    src={`${apiUrl}${brother.avatar}`}
                    alt={brother.name}
                    style={{
                      position: "absolute",
                      right: 10,
                      bottom: 0,
                      height: 80,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row">
          <div className="col">
            <div
              className="card text-white bg-success mb-3"
              style={{ maxWidth: "18rem" }}
            >
              <div className="card-body">
                <h5 className="card-title">Votos na última hora</h5>
                <p className="card-text fs-1">
                  {survey.total_votes_at_last_hour}
                </p>
              </div>
            </div>
          </div>
          {survey.brothers.map((brother) => (
            <div className="col" key={brother.id}>
              <div
                className="card text-white bg-info mb-3"
                style={{ maxWidth: "18rem" }}
              >
                <div className="card-body">
                  <h5 className="card-title">% para {brother.name}</h5>
                  <p className="card-text fs-1 mb-0">
                    {Math.round(
                      ((survey.total_votes_per_brother.find(
                        (vote) => vote.brother_id === brother.id
                      )?.total_votes || 0) /
                        survey.total_votes) *
                        100
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}

export default BackstageView;
