import { apiClient } from "./apiClient";

export const fetchCategories = async () => {
  return apiClient("/categories"); 
};

export const addCategory = async (categoryData) => {
  return apiClient("/categories", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: categoryData,
  });
};
