import { PropsWithChildren } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

type Props = {
  title: string;
  message: string;
  onConfirm: () => void;
};

const ModalConfirm = ({
  title,
  message,
  onConfirm,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <div>
      <div data-bs-toggle="modal" data-bs-target="#confirmModal">
        {children}
      </div>

      <div
        className="modal fade"
        id="confirmModal"
        tabIndex={-1}
        aria-labelledby="confirmModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="confirmModalLabel">
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
    </div>
  );
};
export default ModalConfirm;
