package com.syscoshop.product_service.controller;

import com.syscoshop.product_service.dto.ProductDTO;
import com.syscoshop.product_service.model.Category;
import com.syscoshop.product_service.model.Product;
import com.syscoshop.product_service.model.Supplier;
import com.syscoshop.product_service.repository.CategoryRepository;
import com.syscoshop.product_service.repository.ProductRepository;
import com.syscoshop.product_service.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/products")
@CrossOrigin
public class ProductController {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final SupplierRepository supplierRepository;

    public ProductController(ProductRepository productRepository, SupplierRepository supplierRepository, CategoryRepository categoryRepository){
        this.productRepository = productRepository;
        this.supplierRepository = supplierRepository;
        this.categoryRepository =  categoryRepository;

    }

    private ProductDTO convertToDTO(Product product){
        return new ProductDTO(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getAvailable(),
                product.getCategory().getId(),
                product.getSupplier().getId()
        );
    }

    private Product convertToEntity(ProductDTO dto){
        Optional<Category> category = categoryRepository.findById(dto.getCategoryId());
        Optional<Supplier> supplier = supplierRepository.findById((dto.getSupplierId()));

        if(category.isEmpty() || supplier.isEmpty()){
            throw new RuntimeException("Invalid Category or Supplier Id");
        }

        Product product = new Product();
        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        product.setAvailable(dto.getAvailable());
        product.setCategory(category.get());
        product.setSupplier(supplier.get());
        return product;
    }

    @PostMapping
    public ResponseEntity<ProductDTO> addProduct(@RequestBody ProductDTO productDTO){
        Product product = productRepository.save(convertToEntity(productDTO));
        return ResponseEntity.ok((convertToDTO(product)));
    }
    @GetMapping
    public List<ProductDTO> getAllProducts(){

        return productRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id){
        return productRepository.findById(id)
                .map(product -> ResponseEntity.ok(convertToDTO(product)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public List<ProductDTO> searchProductsByName(@RequestParam String name){
        return productRepository.findByNameContainingIgnoreCase(name)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

}
