import { ReactNode } from "react";

type Prop = {
  isExpanded: boolean
  children: ReactNode
}

export default function Collapse({ isExpanded, children }: Prop) {
  return (
    <>
      <div className={`collapse-root${isExpanded ? " collapse-expanded" : ""}`}>
        <div className="collapse-wrapper">
          <div className="collapse-wrapperInner">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
