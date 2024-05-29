import { useRef, useEffect, ReactNode,HTMLAttributes  } from "react";

type Prop = HTMLAttributes<HTMLDivElement> & {
    children: ReactNode
}

const Card = ({ children, className, ...rest }: Prop) => {
    return (
        <div className={`card-root ${className}`} {...rest}>
            {children}
        </div>
    )
}

export default Card
