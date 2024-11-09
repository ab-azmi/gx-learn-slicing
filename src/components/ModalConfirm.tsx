import { PropsWithChildren } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

type Props = {
  title: string;
  message: string;
  show: boolean;
  onConfirm: () => void;
};

const ModalConfirm = ({
  title,
  message,
  show,
  onConfirm,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <div>
      <div data-bs-toggle="modal" data-bs-target="#exampleModal">
        {children}
      </div>
      <Modal
        title={title}
        message={message}
        show={show}
        onConfirm={onConfirm}
      />
    </div>
  );
};

const Modal = ({ title, message, show, onConfirm }: Props) => {
  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden={show ? "false" : "true"}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              {title}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>{message}</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Cancle
            </button>
            <button
              type="button"
              className="btn btn-outline-primary"
              data-bs-dismiss="modal"
              onClick={onConfirm}
            >
              Process
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirm;
