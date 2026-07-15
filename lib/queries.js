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

function buildProductFilters({ category, manufacturer, keyword }) {
  const conditions = [];
  const params = [];

  if (category) {
    params.push(Number(category));
    conditions.push(`p.category_id = $${params.length}`);
  }

  if (manufacturer) {
    params.push(Number(manufacturer));
    conditions.push(`p.manufacturer_id = $${params.length}`);
  }

  if (keyword) {
    params.push(`%${keyword}%`);
    conditions.push(`(p.title ILIKE $${params.length} OR c.title ILIKE $${params.length} OR m.title ILIKE $${params.length})`);
  }

  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  return { where, params };
}

export async function getProductsCount(filters) {
  const { where, params } = buildProductFilters(filters);
  const { rows } = await query(
    `SELECT count(*)::int AS total
     FROM products p
     JOIN categories c ON c.id = p.category_id
     LEFT JOIN manufacturer m ON m.id = p.manufacturer_id
     ${where}`,
    params
  );
  return rows[0].total;
}

export async function getProducts({ page, perPage, ...filters }) {
  const { where, params } = buildProductFilters(filters);
  const offset = (page - 1) * perPage;

  const { rows } = await query(
    `SELECT p.id, p.title, p.image, c.title AS category, m.title AS manufacturer
     FROM products p
     JOIN categories c ON c.id = p.category_id
     LEFT JOIN manufacturer m ON m.id = p.manufacturer_id
     ${where}
     ORDER BY p.id DESC
     LIMIT $${params.length + 1} OFFSET $${params.length + 2}`,
    [...params, perPage, offset]
  );
  return rows;
}

export async function getUserProducts({ category, keyword }) {
  const conditions = [];
  const params = [];

  if (category) {
    params.push(Number(category));
    conditions.push(`p.category_id = $${params.length}`);
  }

  if (keyword) {
    params.push(`%${keyword}%`);
    conditions.push(`p.title ILIKE $${params.length}`);
  }

  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  const { rows } = await query(
    `SELECT p.id, p.title, p.image, c.title AS category
     FROM products p
     JOIN categories c ON c.id = p.category_id
     ${where}
     ORDER BY p.created_at DESC`,
    params
  );
  return rows;
}

export async function createProduct({ title, categoryId, manufacturerId, sellerName, sellerEmail, sellerPhone, detail, image }) {
  await query(
    `INSERT INTO products (title, category_id, manufacturer_id, seller_name, seller_email, seller_phone, detail, image)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [title, categoryId, manufacturerId, sellerName, sellerEmail, sellerPhone, detail, image]
  );
}
