import Header from "./components/Header";
import Footer from "./components/Footer";
import SearchForm from "./components/SearchForm";
import CategoryGrid from "./components/CategoryGrid";
import { getCategories, getManufacturers, searchCategories } from "../lib/queries";
import styles from "./page.module.css";

export default async function Home({ searchParams }) {
  const params = await searchParams;
  const category = params.category ?? "";
  const manufacturer = params.manufacturer ?? "";
  const keyword = params.keyword ?? "";

  const [categories, manufacturers, results] = await Promise.all([
    getCategories(),
    getManufacturers(),
    searchCategories({ category, manufacturer, keyword }),
  ]);

  return (
    <>
      <Header active="home" categories={categories} manufacturers={manufacturers} />
      <section className={styles.hero}>
        <div className={styles.overlay} />
        <div className={styles.card}>
          <h1 className={styles.title}>New &amp; Used Construction Equipment For Sale</h1>
          <CategoryGrid categories={results} />
          <SearchForm
            categories={categories}
            manufacturers={manufacturers}
            values={{ category, manufacturer, keyword }}
          />
        </div>
      </section>
      <Footer />
    </>
  );
}
