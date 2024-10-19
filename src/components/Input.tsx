type Props = {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  placeholder: string;
  type: string;
};
const Input = ({ value, onChange, label, placeholder, type }: Props) => {
  return (
    <div className="d-flex flex-column gap-1 form-group">
      <label htmlFor="email" className="fw-lighter text-muted" style={{ fontSize: "14px" }}>
        {label}
      </label>
      <input
        value={value}
        onChange={onChange}
        type={type}
        className="form-control"
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
