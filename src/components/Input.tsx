import React, { forwardRef } from "react";

interface InputSubmitProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputSubmitProps>(function Input(
  { className, ...props },
  ref,
) {
  return (
    <input
      {...props}
      ref={ref}
      className={`h-[55px] w-full rounded px-4 pb-4 pt-5 font-medium outline focus:outline-2 ${className}`}
      
    />
  );
});

Input.displayName = "Input";

export default Input;
