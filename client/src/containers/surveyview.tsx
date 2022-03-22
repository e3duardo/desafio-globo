import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

import Survey from '../components/survey';
import { SurveyType } from '../services/types';
import { publicSurvey } from '../services/public-survey';
import Loading from '../components/loading';

function SurveyView() {
  const [survey, setSurvey] = useState<SurveyType | null>(null);

  useEffect(() => {
    publicSurvey().then(survey => {
      setSurvey(survey);
    });
  }, [])

  if (!survey) {
    return <Loading />;
  }

  return (
    <>
      <Container>
        <Survey survey={survey} />
      </Container>
    </>
  );
}

export default SurveyView;
