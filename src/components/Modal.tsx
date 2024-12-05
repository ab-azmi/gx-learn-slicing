import BSModal from 'react-bootstrap/Modal';
import Button from "./Button";
import { PropsWithChildren } from 'react';

type Props = {
  show: boolean;
  title: string;
  onClose: () => void;
};

const Modal = ({
  title,
  show,
  onClose,
  children
}: PropsWithChildren<Props>) => {

  return (
    <>
      <BSModal show={show} onHide={onClose}>
        <BSModal.Header closeButton>
          <BSModal.Title>{title}</BSModal.Title>
        </BSModal.Header>
        <BSModal.Body>
          {children}
        </BSModal.Body>
        <BSModal.Footer>
          <Button type='button' isOutline onClick={onClose}>
            Close
          </Button>
        </BSModal.Footer>
      </BSModal>
    </>
  );
};
export default Modal;
