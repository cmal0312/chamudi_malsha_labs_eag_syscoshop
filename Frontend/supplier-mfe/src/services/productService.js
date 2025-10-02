import { apiClient } from "./apiClient";

export const fetchProducts = async (supplierId, role) => {
    const query = new URLSearchParams({supplierId}).toString();
    return apiClient(`/products?${query}`, {
        headers: {"x-user-role": role},
    });
};

export const addProduct =  async (productData) => {
    return apiClient(`/products`, {
        method: "POST",
        body: productData,
    });
};

export const deleteProduct = async (productId) => {
    return apiClient(`/products/${productId}`, {
        method: "DELETE",
    });
};

export const updateProduct = async (productId, productData) => {
    return apiClient(`/products/${productId}`, {
        method: "PUT",
        body: productData,
    });
};

export const getSupplier = async (supplierId) => {
    return apiClient(`/suppliers/${supplierId}`);
};
