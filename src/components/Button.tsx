import clsx from "clsx";
import { PropsWithChildren } from "react";

type Props = {
  type?: "button" | "submit" | "reset";
  style?: "fill" | "outline";
  onClick?: () => void;
  disabled?: boolean;
  isOutline?: boolean;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
};

const Button = ({
  type = "button",
  onClick,
  disabled,
  isOutline = false,
  children,
  size = "md",
}: PropsWithChildren<Props>) => {
  const classFill = "btn-primary";
  const classOutline = "btn-outline-primary";
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={clsx(isOutline ? classOutline : classFill, "btn hover_darker", {'btn-sm': size === 'sm', 'btn-lg': size === 'lg'})}
    >
      {children}
    </button>
  );
};

export default Button;
