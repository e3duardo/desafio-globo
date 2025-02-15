import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import Survey from "../components/survey";
import { SurveyType } from "../services/types";
import { publicSurvey } from "../services/public-survey";
import Loading from "../components/loading";
import EmptySurvey from "../components/survey/empty";
import { useNavigate } from "react-router-dom";

function SurveyView() {
  const [survey, setSurvey] = useState<SurveyType | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadPublicSurvey();
  }, []);

  async function loadPublicSurvey() {
    try {
      setLoading(true);
      const survey = await publicSurvey();

      if (survey?.status !== "active") {
        navigate("/", { replace: true });
      }
      
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
        <Survey survey={survey} reload={loadPublicSurvey} />
      </Container>
    </>
  );
}

export default SurveyView;
