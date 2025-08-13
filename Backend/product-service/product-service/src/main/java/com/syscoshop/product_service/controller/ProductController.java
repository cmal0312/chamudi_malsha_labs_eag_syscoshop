package com.syscoshop.product_service.controller;

import com.syscoshop.product_service.Service.ProductService;
import com.syscoshop.product_service.dto.ProductDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(AbstractController.BASE_PATH+"/")
public class ProductController extends AbstractController {

    private final ProductService productService;

    public ProductController(ProductService productService){
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<?> getAllProducts(
            @RequestHeader("x-user-role") String role,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Long id
    ){

        logger.info("Fetching products");
        if("admin".equalsIgnoreCase(role)){
            return buildSuccessResponse(productService.getProductsForAdmin(name, id));
        }
        else{
            return buildSuccessResponse(productService.getProductsForCustomer(name, id));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(@PathVariable Long id){
        logger.info("Fetching Product with ID: {}", id);
        ProductDTO productDTO = productService.getProductById(id);
        return buildSuccessResponse(productDTO);
    }

    @PostMapping
    public ResponseEntity<?> createProduct(@RequestBody ProductDTO productDTO){
        logger.info("Creating new product: {}", productDTO.getName());
        ProductDTO savedProduct = productService.createProduct(productDTO);
        return buildSuccessResponse(savedProduct);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable Long id, @RequestBody ProductDTO productDTO){
        logger.info("Updating product with id: {}", id);
        ProductDTO updated = productService.updateProduct(id, productDTO);
        return buildSuccessResponse(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id){
        logger.info("Deleting product with id: {}", id);
        productService.deleteProduct(id);
        return buildSuccessResponse("Product deleted successfully");
    }

}
