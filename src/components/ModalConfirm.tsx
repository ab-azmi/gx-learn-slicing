import Modal from 'react-bootstrap/Modal';
import Button from "./Button";

type Props = {
  show: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onClose: () => void;
};

const ModalConfirm = ({
  title,
  show,
  message,
  onClose,
  onConfirm,
}: Props) => {

  return (
    <>
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {message}
        </Modal.Body>
        <Modal.Footer>
          <Button type='button' onClick={onClose}>
            Close
          </Button>
          <Button type='button' isOutline onClick={onConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalConfirm;
