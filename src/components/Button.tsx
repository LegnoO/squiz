import React from "react";
import { ColorRing } from "react-loader-spinner";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
  className?: string;
}

export default function Button({
  children,
  isLoading,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`flex h-[3rem] w-full items-center justify-center rounded bg-[#0666d0] px-4 transition duration-300 hover:bg-[#063cd0] ${className}`}
      type="button"
      disabled={isLoading}>
      {isLoading ? (
        <span className="font-bold text-white">
          <ColorRing
            visible={true}
            height="30"
            width="30"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
          />
        </span>
      ) : (
        <span className="font-bold text-white">{children}</span>
      )}
    </button>
  );
}
