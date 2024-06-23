"use client";

import { ReactNode } from 'react'
import styles from "./styles/Navbar.module.scss"

interface IProps {
    children: ReactNode
}

const Navbar = ({ children, ...rest }: IProps) => {
    return (
        <div className={styles.Navbar} {...rest}>
            <div className={styles.NavbarWrapper}>
                <div className={styles.NavbarContent}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Navbar
