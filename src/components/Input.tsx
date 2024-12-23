import { Eye, EyeSlash } from "iconsax-react";
import { useState } from "react";

type Props = {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyUp?: (e?: React.KeyboardEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder: string;
  type: string;
  name: string;
  required?: boolean;
  errors?: string;
  autocomplete?: string;
  disabled?: boolean;
};
const Input = ({
  value,
  onChange,
  onFocus,
  onBlur,
  onKeyUp,
  label,
  required,
  placeholder,
  type,
  name,
  errors,
  autocomplete = "on",
  disabled = false,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="d-flex flex-column gap-1 form-group w-100">
      {label && (
        <label htmlFor={name} className="text-muted fs-xs">
          {label}
          {required && <span className="text-danger">*</span>}
        </label>
      )}
      <div className="position-relative">
        <input
          disabled={disabled}
          autoComplete={autocomplete}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyUp={onKeyUp}
          type={(type === "password" && showPassword) ? "text" : type}
          className="form-control"
          placeholder={placeholder}
          required={required}
          name={name}
          id={name}
        />
        {type === "password" && (
          <button
            type="button"
            className="position-absolute top-50 translate-middle-y text-muted bg-transparent border-0 end-2"
            data-testid="show-password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeSlash size="20" variant="Outline" />
            ) : (
              <Eye size="20" variant="Outline" />
            )}
          </button>
        )}
      </div>
      {errors && <span className="text-danger text-xs">{errors}</span>}
    </div>
  );
};

export default Input;
