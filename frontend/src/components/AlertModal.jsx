import { Button, Modal } from 'react-bootstrap';

export default function AlertModal({ text, show, setShow }) {
  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>{text}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
