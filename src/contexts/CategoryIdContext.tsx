import React, { createContext, useContext, useState, ReactNode } from "react";
interface CategoryIdContextProps {
  categoryId: { id: string; name: string };
  setCategoryId: React.Dispatch<
    React.SetStateAction<{ id: string; name: string }>
  >;
}
const CategoryIdContext = createContext<CategoryIdContextProps | undefined>(
  undefined
);
export const CategoryIdProvider = ({ children }: { children: ReactNode }) => {
  const [categoryId, setCategoryId] = useState({ id: "", name: "" });
  return (
    <CategoryIdContext.Provider value={{ categoryId, setCategoryId }}>
      {children}
    </CategoryIdContext.Provider>
  );
};
export const useCategoryId = () => {
  const context = useContext(CategoryIdContext);
  if (context === undefined) {
    throw new Error("useCategoryId must be used within a CategoryIdProvider");
  }
  return context;
};
