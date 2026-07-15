"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "./Header.module.css";
import SellEquipmentModal from "./SellEquipmentModal";

export default function Header({ active, categories = [], manufacturers = [] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        <button 
          className={styles.cta} 
          type="button" 
          onClick={() => setIsModalOpen(true)}
        >
          Sell Your Equipment
        </button>
      </div>

      <SellEquipmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        categories={categories}
        manufacturers={manufacturers}
      />
    </header>
  );
}
