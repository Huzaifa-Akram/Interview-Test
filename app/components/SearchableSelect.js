"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./SearchableSelect.module.css";

export default function SearchableSelect({ name, options, defaultValue, placeholder }) {
  // Find initial title from defaultValue if it exists
  const initialOption = options.find((o) => String(o.id) === String(defaultValue));
  const initialTitle = initialOption ? initialOption.title : "";

  const [inputValue, setInputValue] = useState(initialTitle);
  const [selectedValue, setSelectedValue] = useState(defaultValue || "");
  const [isOpen, setIsOpen] = useState(false);
  
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setIsOpen(true);
  };

  const handleOptionClick = (id, title) => {
    setSelectedValue(id);
    setInputValue(title);
    setIsOpen(false);
  };

  const handleBlur = () => {
    const match = options.find((o) => o.title.toLowerCase() === inputValue.toLowerCase());
    if (match) {
      setSelectedValue(match.id);
      setInputValue(match.title);
    } else if (inputValue.trim() === "") {
      setSelectedValue("");
      setInputValue("");
    } else {
      // Revert to previously selected value if typed text doesn't match any option
      const prev = options.find((o) => String(o.id) === String(selectedValue));
      setInputValue(prev ? prev.title : "");
    }
  };

  const filteredOptions = options.filter((o) => 
    o.title.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className={styles.container} ref={containerRef}>
      <input type="hidden" name={name} value={selectedValue} />
      <input
        type="text"
        className={styles.input}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        onBlur={handleBlur}
      />
      {isOpen && (
        <ul className={styles.dropdown}>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt) => (
              <li 
                key={opt.id} 
                className={styles.option}
                onMouseDown={(e) => {
                  e.preventDefault(); // Prevent blur from firing before click
                  handleOptionClick(opt.id, opt.title);
                }}
              >
                {opt.title}
              </li>
            ))
          ) : (
            <li className={styles.noResult}>No options found</li>
          )}
        </ul>
      )}
    </div>
  );
}
