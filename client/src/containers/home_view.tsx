import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import { SurveyType } from "../services/types";
import { publicSurvey } from "../services/public-survey";
import Loading from "../components/loading";
import EmptySurvey from "../components/survey/empty";
import Banner from "../components/banner";

function SurveyView() {
  const [survey, setSurvey] = useState<SurveyType | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    publicSurvey()
      .then((survey) => {
        setSurvey(survey);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading && !survey) return <Loading />;
  if (!survey) return <EmptySurvey />;

  return (
    <>
      <Container>
        <Banner />
      </Container>
    </>
  );
}

export default SurveyView;
