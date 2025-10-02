import { apiClient } from "./apiClient";

export const fetchProducts = async (filters = {}) => {
  const query = new URLSearchParams();
  if (filters.search) query.append("name", filters.search);
  if (filters.category) query.append("id", filters.category);

  const queryString = query.toString();
  const url = queryString ? `/products?${queryString}` : `/products`;

  return apiClient(url); 
};
