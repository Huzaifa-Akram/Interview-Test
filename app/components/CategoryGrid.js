import Image from "next/image";
import styles from "./CategoryGrid.module.css";

export default function CategoryGrid({ categories }) {
  if (categories.length === 0) {
    return <p className={styles.empty}>No categories match your search.</p>;
  }

  return (
    <div className={styles.grid}>
      {categories.map((category, index) => {
        const iconIndex = (index % 7) + 1;
        return (
          <div key={category.id} className={styles.item}>
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
          </div>
        );
      })}
    </div>
  );
}
