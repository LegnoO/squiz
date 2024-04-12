import { useRef, useEffect } from "react";

const ClickAwayListenerCustom = ({
  children,
  onClickAway,
}: {
  children: React.ReactNode;
  onClickAway: () => void;
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const targetNode = event.target as Node;
      if (wrapperRef.current && !wrapperRef.current.contains(targetNode)) {
        if (onClickAway) {
          onClickAway();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{ borderRadius: "inherit" }}
      className="ClickAwayListenerCustom"
      ref={wrapperRef}>
      {children}
    </div>
  );
};

export default ClickAwayListenerCustom;
