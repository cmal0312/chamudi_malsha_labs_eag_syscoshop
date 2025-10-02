import { apiClient } from "./apiClient";

export const fetchCategories = async () => {
  return apiClient("/categories");
};
