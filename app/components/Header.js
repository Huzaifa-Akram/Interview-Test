import Link from "next/link";
import styles from "./Header.module.css";

export default function Header({ active }) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <span className={styles.logo}>LOGO</span>
        <nav className={styles.nav}>
          <Link className={active === "home" ? styles.active : ""} href="/">
            Home
          </Link>
          <Link href="#">Wishlist</Link>
          <Link className={active === "contact" ? styles.active : ""} href="/contact">
            Contact us
          </Link>
        </nav>
        <button className={styles.cta} type="button">
          Sell Your Equipment
        </button>
      </div>
    </header>
  );
}
