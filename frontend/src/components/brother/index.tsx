import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BrotherType } from '../../services/types';

type BrotherProps = {
  brother: BrotherType;
}

function Brother({ brother }: BrotherProps) {
  return (
    <Card>
      <Card.Img variant="top" src={brother.avatar} />
      <Card.Body>
        <Card.Title>{brother.name}</Card.Title>
        <Card.Text>{brother.resume}</Card.Text>
        {/* <Button variant="primary" >Eliminar</Button> */}
        <Link to={`/votar/${brother.id}`} className='btn btn-primary'>Vote para eliminar</Link>
      </Card.Body>
    </Card>
  )
}

export default Brother;
