"use client";

// ** React Imports
import { useEffect, useRef } from "react";

// ** Types
interface ILoadingProps {
  width?: string;
  height?: string;
  color?: string;
}

export default function Loading({
  width = "2rem",
  height = "2rem",
  color = "hsl(332, 100%, 50%)",
}: ILoadingProps) {
  const spinnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (spinnerRef.current) {
      spinnerRef.current.style.setProperty("--spinner-width", width);
      spinnerRef.current.style.setProperty("--spinner-height", height);
      spinnerRef.current.style.setProperty("--spinner-color", color);
    }
  }, []);

  return <div ref={spinnerRef} className="Spinner-root" />;
}
