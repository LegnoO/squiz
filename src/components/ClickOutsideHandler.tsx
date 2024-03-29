import { useRef, useEffect } from "react";

const ClickOutsideHandler = ({
  children,
  onOutsideClick,
}: {
  children: React.ReactNode;
  onOutsideClick: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const targetNode = event.target as Node;
      if (wrapperRef.current && !wrapperRef.current.contains(targetNode)) {
        onOutsideClick(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="ClickOutSide-Component" ref={wrapperRef}>
      {children}
    </div>
  );
};

export default ClickOutsideHandler;
