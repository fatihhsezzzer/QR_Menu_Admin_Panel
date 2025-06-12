import { createContext, useContext, useState } from "react";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState(
    localStorage.getItem("selectedCategory") || "19"
  );

  // Kategori seçildiğinde localStorage'a kaydediyoruz.
  const updateCategory = (category) => {
    setSelectedCategory(category);
    localStorage.setItem("selectedCategory", category);
  };

  return (
    <CategoryContext.Provider value={{ selectedCategory, updateCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext);
