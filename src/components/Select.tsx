type Props = {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  label?: string;
  placeholder: string;
  options: { value: number|string; name: string; created_at?: string }[];
  name: string;
  errors?: string;
};
const Select = ({
  value,
  onChange,
  label,
  name,
  errors,
  options,
  placeholder,
}: Props) => {
  return (
    <div className="d-flex flex-column gap-1 form-group">
      {label && (
        <label htmlFor={name} className="fw-light fs-xs text-capitalize">
          {label}
        </label>
      )}
      <select
        onChange={onChange}
        value={value}
        name={name}
        id={name}
        className="form-select text-capitalize"
        aria-label="Default select example"
      >
        <option value={-1}>{placeholder}</option>
        {options.map((option) => (
          <option className="text-capitalize" key={option.name} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
      {errors && <span className="text-danger text-xs">{errors}</span>}
    </div>
  );
};

export default Select;
