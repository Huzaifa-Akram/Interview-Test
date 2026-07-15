import Link from "next/link";
import styles from "./Pagination.module.css";

function getPageItems(current, total) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const set = new Set([1, 2, total - 1, total, current - 1, current, current + 1]);
  const pages = [...set].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);

  const items = [];
  let prev = 0;
  for (const p of pages) {
    if (p - prev > 1) items.push("...");
    items.push(p);
    prev = p;
  }
  return items;
}

function buildHref(basePath, params, page) {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value) search.set(key, value);
  }
  search.set("page", String(page));
  return `${basePath}?${search.toString()}`;
}

export default function Pagination({ basePath, params, currentPage, totalPages }) {
  if (totalPages <= 1) {
    return null;
  }

  const items = getPageItems(currentPage, totalPages);

  return (
    <nav className={styles.pagination}>
      <Link
        className={`${styles.arrow} ${currentPage === 1 ? styles.disabled : ""}`}
        href={buildHref(basePath, params, Math.max(1, currentPage - 1))}
        aria-label="Previous page"
      >
        ‹
      </Link>

      {items.map((item, index) =>
        item === "..." ? (
          <span key={`gap-${index}`} className={styles.gap}>
            …
          </span>
        ) : (
          <Link
            key={item}
            className={`${styles.page} ${item === currentPage ? styles.active : ""}`}
            href={buildHref(basePath, params, item)}
          >
            {item}
          </Link>
        )
      )}

      <Link
        className={`${styles.arrow} ${currentPage === totalPages ? styles.disabled : ""}`}
        href={buildHref(basePath, params, Math.min(totalPages, currentPage + 1))}
        aria-label="Next page"
      >
        ›
      </Link>
    </nav>
  );
}
