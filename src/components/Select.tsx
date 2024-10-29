type Props = {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  label: string;
  placeholder: string;
  options: { id: number; name: string, created_at?: string }[];
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
      <label htmlFor={name} className="fw-light fs-xs">
        {label}
      </label>
      <select
        onChange={onChange}
        value={value || -1}
        name={name}
        id={name}
        className="form-select"
        aria-label="Default select example"
      >
        <option key={-1}>{placeholder}</option>
       {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
       ))}
      </select>
      {errors && <span className="text-danger text-xs">{errors}</span>}
    </div>
  );
};

export default Select;