import { Col, Row, Container } from 'react-bootstrap';
import { SurveyType } from '../../services/types';
import Brother from '../brother';

type SurveyProps = {
  survey: SurveyType;
}

function Survey({ survey }: SurveyProps) {
  return (
    <Row>
      {
        survey.brothers.map(brother => <Col><Brother key={brother.id} brother={brother} /></Col>)
      }
    </Row>
  )
}

export default Survey;
