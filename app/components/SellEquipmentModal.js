"use client";
import React, { useEffect, useState } from "react";
import { sellEquipment } from "../actions";
import styles from "./SellEquipmentModal.module.css";
import SearchableSelect from "./SearchableSelect";

export default function SellEquipmentModal({ isOpen, onClose, categories = [], manufacturers = [] }) {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setStatus("idle");
      setError("");
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("saving");
    setError("");
    const result = await sellEquipment(new FormData(e.currentTarget));
    if (result?.error) {
      setStatus("idle");
      setError(result.error);
    } else {
      setStatus("done");
    }
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>SELL YOUR EQUIPMENT</h2>

        {status === "done" ? (
          <div className={styles.success}>
            <p>Your equipment has been submitted successfully.</p>
            <button type="button" className={styles.submitBtn} onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.row}>
              <input type="text" name="name" placeholder="Name" className={styles.input} required />
              <input type="email" name="email" placeholder="Email" className={styles.input} required />
            </div>
            <div className={styles.row}>
              <input type="tel" name="phone" placeholder="Mobile Number" className={styles.input} required />
              <SearchableSelect
                name="manufacturer"
                options={manufacturers}
                placeholder="Select Manufacturer"
                required
              />
            </div>
            <div className={styles.row}>
              <input
                type="text"
                name="title"
                placeholder="Equipment Title"
                className={styles.input}
                required
              />
              <SearchableSelect
                name="category"
                options={categories}
                placeholder="Select Category"
                required
              />
            </div>
            <textarea
              name="detail"
              placeholder="Vehicle Detail"
              className={styles.textarea}
              rows="5"
              required
            ></textarea>
            <label className={styles.fileLabel}>
              Equipment Image
              <input type="file" name="image" accept="image/*" className={styles.fileInput} />
            </label>
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" className={styles.submitBtn} disabled={status === "saving"}>
              {status === "saving" ? "Submitting..." : "Submit"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
