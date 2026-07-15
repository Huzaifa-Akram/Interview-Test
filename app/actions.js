"use server";

import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { createProduct } from "../lib/queries";

export async function sellEquipment(formData) {
  const title = formData.get("title")?.trim();
  const categoryId = Number(formData.get("category"));
  const manufacturerId = Number(formData.get("manufacturer"));

  if (!title || !categoryId) {
    return { error: "Title and category are required." };
  }

  let imagePath = null;
  const file = formData.get("image");

  if (file && file.size > 0) {
    if (!file.type.startsWith("image/")) {
      return { error: "Only image files are allowed." };
    }
    const ext = path.extname(file.name) || ".png";
    const fileName = `${Date.now()}${ext}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(uploadDir, fileName), buffer);
    imagePath = `/uploads/${fileName}`;
  }

  await createProduct({
    title,
    categoryId,
    manufacturerId,
    sellerName: formData.get("name"),
    sellerEmail: formData.get("email"),
    sellerPhone: formData.get("phone"),
    detail: formData.get("detail"),
    image: imagePath,
  });

  revalidatePath("/products");
  return { success: true };
}
