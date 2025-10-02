package com.syscoshop.product_service.controller;

import com.syscoshop.product_service.Service.ProductService;
import com.syscoshop.product_service.constants.Constants;
import com.syscoshop.product_service.dto.ProductDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping(Constants.BASE_PATH+"/products")
public class ProductController extends AbstractController {

    private final ProductService productService;

    public ProductController(ProductService productService){
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<?> getAllProducts(
            @RequestHeader("x-user-role") String role,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Long id,
            @RequestParam(required = false) Long supplierId
    ){

        logger.info("Fetching products");
        try {
            if ("admin".equalsIgnoreCase(role)) {
                return buildSuccessResponse(productService.getProductsForAdmin(name, id, supplierId));
            } else if ("customer".equalsIgnoreCase(role)) {
                return buildSuccessResponse(productService.getProductsForCustomer(name, id, supplierId));
            }
            else
                {
                    // Invalid role
                    return ResponseEntity
                            .status(HttpStatus.FORBIDDEN)
                            .body(Map.of("error", "Invalid user role: " + role));
                }
        } catch (Exception e) {
            logger.info("Error fetching products from product-service");
            throw e;
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(@PathVariable Long id){
        logger.info("Fetching Product with ID: {}", id);
        try {
            ProductDTO productDTO = productService.getProductById(id);
            return buildSuccessResponse(productDTO);
        } catch (Exception e) {
            logger.info("Error fetching product from product-service");
            throw e;
        }
    }

    @PostMapping
    public ResponseEntity<?> createProduct(@RequestBody ProductDTO productDTO){
        logger.info("Creating new product: {}", productDTO.getName());
        try {
            ProductDTO savedProduct = productService.createProduct(productDTO);
            return buildSuccessResponse(savedProduct);
        } catch (Exception e) {
            logger.info("Error creating new product");
            throw e;
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable Long id, @RequestBody ProductDTO productDTO){
        logger.info("Updating product with id: {}", id);
        try {
            ProductDTO updated = productService.updateProduct(id, productDTO);
            return buildSuccessResponse(updated);
        } catch (Exception e) {
            logger.info("Error updating the product");
            throw e;
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id){
        logger.info("Deleting product with id: {}", id);
        try {
            productService.deleteProduct(id);
            return buildSuccessResponse("Product deleted successfully");
        } catch (Exception e) {
            logger.info("Error deleting product");
            throw e;
        }
    }

}
