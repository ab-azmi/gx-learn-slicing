import { Eye, EyeSlash } from "iconsax-react";
import { useState } from "react";

type Props = {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  placeholder: string;
  type: string;
};
const Input = ({ value, onChange, label, placeholder, type }: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="d-flex flex-column gap-1 form-group">
      <label
        htmlFor="email"
        className="fw-lighter text-muted"
        style={{ fontSize: "14px" }}
      >
        {label}
      </label>
      <div className="position-relative">
        <input
          value={value}
          onChange={onChange}
          type={type === "password" && showPassword ? "text" : type}
          className="form-control"
          placeholder={placeholder}
        />
        {type === "password" && (
          <span
            className="position-absolute top-50 translate-middle-y text-muted"
            style={{ cursor: "pointer", right: "10px" }}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeSlash size="20" variant="Outline" />
            ) : (
              <Eye size="20" variant="Outline" />
            )}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
