import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import { getProducts, getProductsCount, getCategories, getManufacturers } from "../../lib/queries";
import styles from "./products.module.css";

const PER_PAGE = 12;

export const metadata = {
  title: "Listings",
};

export default async function ProductsPage({ searchParams }) {
  const sp = await searchParams;
  const category = sp.category ?? "";
  const manufacturer = sp.manufacturer ?? "";
  const keyword = sp.keyword ?? "";
  const page = Math.max(1, Number(sp.page) || 1);

  const filters = { category, manufacturer, keyword };
  const [total, products, categories, manufacturers] = await Promise.all([
    getProductsCount(filters),
    getProducts({ ...filters, page, perPage: PER_PAGE }),
    getCategories(),
    getManufacturers(),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
  const start = total === 0 ? 0 : (page - 1) * PER_PAGE + 1;
  const end = Math.min(page * PER_PAGE, total);

  return (
    <>
      <Header categories={categories} manufacturers={manufacturers} />
      <main className={styles.main}>
        <div className={styles.listHeader}>
          <h1 className={styles.heading}>List</h1>
          <span className={styles.count}>
            {start}-{end} Showing
          </span>
        </div>

        {products.length === 0 ? (
          <p className={styles.empty}>No listings found.</p>
        ) : (
          <div className={styles.grid}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <Pagination
          basePath="/products"
          params={filters}
          currentPage={page}
          totalPages={totalPages}
        />
      </main>
      <Footer />
    </>
  );
}
