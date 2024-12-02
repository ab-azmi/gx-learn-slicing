import getNestedValue from "@/helpers/getNestedValue.helper";
import priceFormater from "@/helpers/priceFormater.helper";
import { PropsWithChildren } from "react";

type Props<T> = {
  title: string;
  data: T[];
  columns: {
    field: string;
    title: string;
    type?: string;
  }[]
  onClear?: () => void;
}

const ModalTable = <T, >({
  data,
  title = "Modal",
  columns,
  onClear,
  children
}: PropsWithChildren<Props<T>>) => {
  return (
    <>
      <div data-bs-toggle="modal" data-bs-target="#ModalTable">
        {children}
      </div>

      <div
        className="modal fade"
        id="ModalTable"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="ModalTableLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="ModalTableLabel">
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
              <table className="w-100">
                <thead>
                  <tr>
                    {columns.map((col, index) => (
                      <th key={index} scope="col">
                        {col.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.length <= 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center">
                        No Data
                      </td>
                    </tr>
                  ) : (
                    data.map((item, index) => (
                      <tr key={index}>
                        {columns.map((col) => (
                          <td key={col.field as string}>
                            {col.type === "price" 
                              ? priceFormater(item[col.field as keyof T] as unknown as number) 
                              : getNestedValue(item, col.field)}
                          </td>
                        ))}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              {onClear && (
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={onClear}
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ModalTable