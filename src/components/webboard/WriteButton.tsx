import type { ComponentPropsWithoutRef } from "react";

type ButtonProps = ComponentPropsWithoutRef<"button">;

export default function WriteButton(props: ButtonProps) {
  const { className, children, ...rest } = props;

  return (
    <button {...rest} className={`btn-write ${className ?? ""}`}>
      {children}
    </button>
  );
}
