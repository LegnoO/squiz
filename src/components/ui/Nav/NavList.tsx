"use client";

import { ReactNode } from 'react'
import styles from "./styles/NavList.module.scss"

interface IProps {
    children: ReactNode
}

const NavList = ({ children, ...rest }: IProps) => {
    return (
        <ul className={styles.NavList} {...rest}>
            {children}
        </ul>
    )
}

export default NavList
