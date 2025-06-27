import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export default function Button({ type = "button", className, children, ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={`bg-primary text-primary-foreground py-3 px-6 text-base sm:text-lg rounded border border-primary shadow-md hover:bg-primary/80 hover:shadow-lg hover:scale-105 transition-transform ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
