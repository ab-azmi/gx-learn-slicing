import getNestedValue from "@/helpers/getNestedValue.helper";
import priceFormater from "@/helpers/priceFormater.helper";
import Modal from 'react-bootstrap/Modal';
import Button from "./Button";

type Props<T> = {
  title?: string;
  data: T[];
  columns: {
    field: string;
    title: string;
    type?: string;
  }[]
  onClear?: () => void;
  onClose: () => void;
  show: boolean;
}

const ModalTable = <T,>({
  show,
  data,
  title = "Modal",
  columns,
  onClear,
  onClose,
}: Props<T>) => {
  return (
    <>
      <Modal show={show} onHide={onClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
              {!data || data?.length <= 0 ? (
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
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" onClick={onClose}>
            Close
          </Button>
          {onClear && (
            <Button type="button" isOutline onClick={onClear}>
              Clear
            </Button>
          )}
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default ModalTable