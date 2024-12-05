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
    <div className="vstack gap-1 form-group w-auto">
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
        className="form-select text-capitalize w-auto"
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
