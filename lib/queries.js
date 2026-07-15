import { query } from "./db";

export async function getCategories() {
  const { rows } = await query("SELECT id, title FROM categories ORDER BY title");
  return rows;
}

export async function getManufacturers() {
  const { rows } = await query("SELECT id, title FROM manufacturer ORDER BY title");
  return rows;
}

export async function searchCategories({ category, manufacturer, keyword }) {
  const conditions = [];
  const params = [];

  if (manufacturer) {
    params.push(Number(manufacturer));
    conditions.push(
      `c.id IN (SELECT category_id FROM categorymanufacturer WHERE manufacturer_id = $${params.length})`
    );
  }

  if (category) {
    params.push(Number(category));
    conditions.push(`c.id = $${params.length}`);
  }

  if (keyword) {
    params.push(`%${keyword}%`);
    conditions.push(`c.title ILIKE $${params.length}`);
  }

  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  const { rows } = await query(
    `SELECT c.id, c.title FROM categories c ${where} ORDER BY c.title`,
    params
  );
  return rows;
}
