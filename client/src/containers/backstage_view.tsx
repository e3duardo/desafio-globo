import { useCallback, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { SurveyType } from "../services/types";
import { publicSurvey } from "../services/public-survey";
import Loading from "../components/loading";
import EmptySurvey from "../components/survey/empty";
import { apiUrl } from "../services/base";
import { closeSurvey } from "../services/survey";

function BackstageView() {
  const [survey, setSurvey] = useState<SurveyType | null>(null);
  const [loading, setLoading] = useState(false);
  const ConfirmSwal = withReactContent(Swal);

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

  function handleFinishSurvey() {
    if (survey?.status === "active") {
      ConfirmSwal.fire({
        title: "Tem certeza 😲 ?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Sim 👹",
        denyButtonText: "Não 🙏🏻",
        // didOpen: () => {
        //   // `MySwal` is a subclass of `Swal`
        //   //   with all the same instance & static methods
        //   ConfirmSwal.clickConfirm()
        // }
      }).then((result: any) => {
        if (result.isConfirmed) {
          closeSurvey(survey.id).then((ok) => {
            ok
              ? Swal.fire("Já foi!", "", "success")
              : Swal.fire("Ops!", "", "error");

            // eslint-disable-next-line no-restricted-globals
            location.reload();
          });
        } else if (result.isDenied) {
          Swal.fire("Uffa, essa foi por pouco!", "", "success");
        }
      });
    }
  }

  if (loading && !survey) return <Loading />;
  if (!survey) return <EmptySurvey />;

  return (
    <>
      <Container>
        {survey.status === "active" ? (
          <div className="p-3 mb-4 bg-secondary rounded-3 fs-3 text-center text-white">
            VOTAÇÃO ATIVA
          </div>
        ) : (
          <div className="p-3 mb-4 rounded-3 fs-3 text-center bg-opacity-25 bg-black text-black-50">
            VOTAÇÃO ENCERRADA
          </div>
        )}

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
        <div className="row mb-5">
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
        {survey.status === "active" && (
          <div className="d-flex justify-content-center mt-4 mb-5">
            <button
              type="button"
              className="btn btn-danger btn-lg"
              onClick={handleFinishSurvey}
            >
              ENCERRAR VOTAÇÃO
            </button>
          </div>
        )}
      </Container>
    </>
  );
}

export default BackstageView;
