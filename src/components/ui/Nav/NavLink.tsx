"use client";

import { ReactNode } from 'react'
import Link from "next/link";
import styles from "./styles/NavLink.module.scss"

interface IProps {
    href: string,
    active?: boolean,
    children: ReactNode
}

const NavLink = ({ href = "", children, active , ...rest }: IProps) => {
    return (
        <li className={`${styles.NavLink}${active ? ` ${styles.NavLinkActive}` : ''}`} {...rest}>
            <Link href={href}>{children}</Link>
            <div className={styles.NavLinkDropdown}>
            </div>
        </li>
    )
}

export default NavLink
