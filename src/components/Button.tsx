import clsx from "clsx";
import { PropsWithChildren } from "react";

type Props = {
  type?: "button" | "submit" | "reset";
  style?: "fill" | "outline";
  onClick?: () => void;
  children: React.ReactNode;
};

const Button = ({
  type = "button",
  style = "fill",
  onClick,
  children,
}: PropsWithChildren<Props>) => {
  const classFill = "bg-primary text-black";
  const classOutline = "border-primary button-outline";
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(style === "fill" ? classFill : classOutline, "button hover_darker")}
    >
      {children}
    </button>
  );
};

export default Button;
