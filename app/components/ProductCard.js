import Image from "next/image";
import styles from "./ProductCard.module.css";

function HeartIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1 7.8 7.8 7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z" />
    </svg>
  );
}

export default function ProductCard({ product }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.title}>{product.title}</h3>
          <p className={styles.category}>{product.category}</p>
        </div>
        <button className={styles.wishlist} type="button" aria-label="Add to wishlist">
          <HeartIcon />
        </button>
      </div>

      <div className={styles.image}>
        <Image 
          src={product.image || "/product-dummy.png"} 
          alt={product.title || product.manufacturer || "Product"} 
          fill 
          sizes="300px" 
        />
      </div>

      <div className={styles.actions}>
        <a className={`${styles.action} ${styles.finance}`} href="#">
          Apply for Financing
        </a>
        <a className={`${styles.action} ${styles.shipping}`} href="#">
          Get Shipping Quotes
        </a>
      </div>

      <a className={styles.details} href="#">
        More Details
      </a>
    </div>
  );
}
