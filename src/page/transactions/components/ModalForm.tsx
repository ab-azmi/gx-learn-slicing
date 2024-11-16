import clsx from "clsx";
import { PropsWithChildren } from "react";

type Props = {
  show: boolean;
  setShow: (show: boolean) => void;
  onSave?: () => void;
};

const ModalForm = ({
  show,
  setShow,
  onSave,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <div
      className={clsx("modal fade", show ? "d-block show" : "")}
      id="exampleModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="false"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Edit Lead
            </h1>
            <button
              onClick={() => setShow(false)}
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">{children}</div>
          <div className="modal-footer">
            <button
              onClick={() => setShow(false)}
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            {onSave && (
              <button onClick={onSave} type="button" className="btn btn-primary">
                Save changes
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalForm;
