import { Edit, Trash } from "iconsax-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getNestedValue = (obj: any, path: string) => {
  //return data from column path
  //if path is 'probability.name' then return obj.probability.name
  return (
    obj[path] || path.split(".").reduce((acc, key) => acc && acc[key], obj)
  );
};

type TableProps<T> = {
  data: T[];
  columns: { key: string; title: string }[];
  onDelete?: (item: T) => void;
  onEdit?: (item: T) => void;
};

const Table = <T,>({ data, columns, onDelete, onEdit }: TableProps<T>) => {
  return (
    <div className="table-responsive p-3 bg-secondary rounded-4">
      <table className="table table-striped">
        <thead>
          <tr className="text-uppercase">
            {columns.map((column, index) => (
              <th key={index}>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {columns.map((column, idx) => (
                <td key={idx}>{String(getNestedValue(item, column.key))}</td>
              ))}
              <td className="">
                {onEdit && (
                  <button
                    type="button"
                    className="btn btn-sm text-muted"
                    onClick={() => onEdit(item)}
                  >
                    <Edit size="24" variant="Bulk" />
                  </button>
                )}
                {onDelete && (
                  <button
                    type="button"
                    className="btn btn-sm text-danger"
                    onClick={() => onDelete(item)}
                  >
                    <Trash size="24" variant="Bulk" />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
