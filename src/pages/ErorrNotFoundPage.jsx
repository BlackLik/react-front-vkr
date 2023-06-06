import { Button, Modal } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router';

function ErorrNotFoundPage() {
  const navigate = useNavigate();
  return (
    <div
      className='modal show'
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Error 404</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h1>404</h1>
          <p>Данная страница не существует</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={() => navigate(-1)}>
            Назад
          </Button>
          <LinkContainer to='/'>
            <Button variant='secondary'>На главную</Button>
          </LinkContainer>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default ErorrNotFoundPage;
