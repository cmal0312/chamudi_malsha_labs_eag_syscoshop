import { apiClient } from "./apiClient";

export const getSuppliers = async () => {
  return apiClient("/suppliers");
};

export const createSupplier = async (supplier) => {
  return apiClient("/suppliers", {
    method: "POST",
    body: supplier, 
  });
};

export const getSupplierById = async (id) => {
  return apiClient(`/suppliers/${id}`);
};
