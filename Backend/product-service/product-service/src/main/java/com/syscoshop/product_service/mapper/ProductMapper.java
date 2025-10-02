package com.syscoshop.product_service.mapper;

import com.syscoshop.product_service.dto.ProductDTO;
import com.syscoshop.product_service.exception.ResourceNotFoundException;
import com.syscoshop.product_service.model.Category;
import com.syscoshop.product_service.model.Product;
import com.syscoshop.product_service.model.Supplier;
import com.syscoshop.product_service.repository.CategoryRepository;
import com.syscoshop.product_service.repository.SupplierRepository;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper {

    private final CategoryRepository categoryRepository;
    private final SupplierRepository supplierRepository;

    public ProductMapper(CategoryRepository categoryRepository, SupplierRepository supplierRepository){
        this.categoryRepository = categoryRepository;
        this.supplierRepository = supplierRepository;
    }

    public ProductDTO convertToDTO(Product product){
        return new ProductDTO(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getAvailable(),
                product.getCategory().getId(),
                product.getSupplier().getCognitoId(),
                product.getApproved(),
                product.getImageUrl(),
                product.getRejected()
        );
    }

    public Product convertToEntity(ProductDTO dto){
        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found "));
        Supplier supplier = supplierRepository.findByCognitoId(dto.getSupplierId())
                .orElseThrow(() -> new ResourceNotFoundException("Supplier not found"));

        Product product = new Product();
        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        product.setAvailable(dto.getAvailable());
        product.setCategory(category);
        product.setSupplier(supplier);
        product.setApproved(dto.getApproved());
        product.setImageUrl(dto.getImageUrl());
        product.setRejected(dto.getRejected());
        return product;
    }
}
