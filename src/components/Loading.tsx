"use client";

// ** React Imports
import { useEffect, useRef } from "react";

// ** Types
interface ILoadingProps {
  size?: string;
  color?: string;
}

export default function Loading({ size,  color }: ILoadingProps) {
  const spinnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (spinnerRef.current) {

      if (size) spinnerRef.current.style.setProperty("--spinner-size", size);
      if (color) spinnerRef.current.style.setProperty("--spinner-color", color);
    }
  }, []);

  return <div ref={spinnerRef} className="SpinnerRoot SpinnerBase" />;
}
