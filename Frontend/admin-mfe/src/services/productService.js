import { apiClient } from "./apiClient";

export const fetchProducts = async () => {
    return apiClient(`/products`, {
        method: "GET",
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

