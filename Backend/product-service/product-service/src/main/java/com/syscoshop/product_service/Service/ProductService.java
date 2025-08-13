package com.syscoshop.product_service.Service;

import com.syscoshop.product_service.dto.ProductDTO;

import java.util.List;

public interface ProductService {

    List<ProductDTO> getProductsForAdmin(String name, Long id);

    List<ProductDTO> getProductsForCustomer(String name, Long id);

    ProductDTO getProductById(Long id);

    ProductDTO createProduct(ProductDTO productDTO);

    ProductDTO updateProduct(Long id, ProductDTO productDTO);

    void deleteProduct(Long id);

}
