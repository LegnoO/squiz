import { ReactNode,HTMLAttributes } from "react";

type Prop = HTMLAttributes<HTMLDivElement> & {
    children: ReactNode
}

const CardContent =({ children, className, ...rest }: Prop) => {
  return (
    <div className={`card-content ${className}`} {...rest}>
      {children}
    </div>
  )
}

export default CardContent
