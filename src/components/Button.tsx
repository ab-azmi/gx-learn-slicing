import clsx from "clsx";
import { PropsWithChildren } from "react";

type Props = {
  type?: "button" | "submit" | "reset";
  style?: "fill" | "outline";
  onClick?: () => void;
  disabled?: boolean;
  isOutline?: boolean;
  children: React.ReactNode;
};

const Button = ({
  type = "button",
  onClick,
  disabled,
  isOutline = false,
  children,
}: PropsWithChildren<Props>) => {
  const classFill = "bg-primary text-black";
  const classOutline = "btn-outline-primary";
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={clsx(isOutline ? classOutline : classFill, "btn hover_darker")}
    >
      {children}
    </button>
  );
};

export default Button;
