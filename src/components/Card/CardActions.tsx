import { ReactNode,HTMLAttributes } from "react";

type Prop = HTMLAttributes<HTMLDivElement> & {
    children: ReactNode
}

const CardActions =({ children, className, ...rest }: Prop) => {
  return (
    <div className={`card-actions ${className}`} {...rest}>
      {children}
    </div>
  )
}

export default CardActions
