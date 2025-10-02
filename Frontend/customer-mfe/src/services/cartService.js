import { apiClient } from "./apiClient";

export const fetchCart = async () => {
  return apiClient("/carts"); 
};

export const updateCart = async (items) => {
  return apiClient("/carts", {
    method: "PUT",
    body: { items },
  });
};
