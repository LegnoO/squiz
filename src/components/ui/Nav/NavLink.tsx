"use client";

import { ReactNode } from "react";
import Link from "next/link";
import styles from "./styles/NavLink.module.scss";
import { usePathname } from "next/navigation";

interface IProps {
  href: string;
  className?: string;
  children: ReactNode;
}

const NavLink = ({ className, href = "", children, ...rest }: IProps) => {
  const pathname = usePathname();

  return (
    <li
      className={`${styles.NavLink}${pathname.startsWith(href) ? ` ${styles.NavLinkActive}` : ""} ${className}`}
      {...rest}>
      <Link href={href}>{children}</Link>
      <div className={styles.NavLinkDropdown}></div>
    </li>
  );
};

export default NavLink;
