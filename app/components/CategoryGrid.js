"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./CategoryGrid.module.css";

export default function CategoryGrid({ categories }) {
  const [showAll, setShowAll] = useState(false);

  if (categories.length === 0) {
    return <p className={styles.empty}>No categories match your search.</p>;
  }

  return (
    <>
      <div className={`${styles.grid} ${showAll ? styles.gridExpanded : ""}`}>
        {categories.map((category, index) => {
          const iconIndex = (index % 7) + 1;
          return (
            <Link
              key={category.id}
              href={`/products?category=${category.id}`}
              className={styles.item}
            >
              <span className={styles.icon}>
                <Image
                  src={`/icons/category-dummy-${iconIndex}.svg`}
                  alt={category.title}
                  width={120}
                  height={120}
                  style={{ objectFit: "contain", maxHeight: "80px", width: "auto" }}
                />
              </span>
              <span className={styles.label}>{category.title}</span>
            </Link>
          );
        })}
      </div>
      
      {categories.length > 21 && (
        <div className={styles.showAllContainer}>
          <button 
            type="button" 
            onClick={() => setShowAll(!showAll)} 
            className={styles.showAllButton}
          >
            {showAll ? "Show less" : "Show all"}
          </button>
        </div>
      )}
    </>
  );
}
