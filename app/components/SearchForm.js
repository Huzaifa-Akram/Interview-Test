import styles from "./SearchForm.module.css";
import SearchableSelect from "./SearchableSelect";

export default function SearchForm({ categories, manufacturers, values }) {
  return (
    <form className={styles.form} method="get">
      <SearchableSelect 
        name="category"
        options={categories}
        defaultValue={values.category}
        placeholder="All Categories"
      />

      <SearchableSelect 
        name="manufacturer"
        options={manufacturers}
        defaultValue={values.manufacturer}
        placeholder="All Manufactures"
      />

      <input
        className={styles.field}
        type="text"
        name="keyword"
        placeholder="Enter Keywords"
        defaultValue={values.keyword}
      />

      <button className={styles.button} type="submit">
        Search
      </button>
    </form>
  );
}
