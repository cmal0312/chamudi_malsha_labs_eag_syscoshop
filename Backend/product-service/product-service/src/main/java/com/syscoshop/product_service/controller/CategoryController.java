package com.syscoshop.product_service.controller;

import com.syscoshop.product_service.Service.CategoryService;
import com.syscoshop.product_service.constants.Constants;
import com.syscoshop.product_service.dto.CategoryDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(Constants.BASE_PATH + "/categories")
public class CategoryController extends AbstractController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService){
        this.categoryService =  categoryService;
    }

    @GetMapping
    public ResponseEntity<?> getAllCategories(){
        logger.info("Fetching categories");
        try {
            List<CategoryDTO> categories = categoryService.getAllCategories();
            return buildSuccessResponse(categories);
        } catch (Exception e) {
            logger.info("Error fetching categories from product-service");
            throw e;
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCategoryById(@PathVariable Long id){
        logger.info("Fetching category with ID: {}", id);
        try {
            CategoryDTO category = categoryService.getCategoryById(id);
            return buildSuccessResponse(category);
        } catch (Exception e) {
            logger.info("Error fetching category from product service");
            throw e;
        }
    }

    @PostMapping
    public ResponseEntity<?> createCategory(@RequestBody CategoryDTO categoryDTO){
        logger.info("creating new category: {}", categoryDTO.getName());
        try {
            CategoryDTO category = categoryService.createCategory(categoryDTO);
            return buildSuccessResponse(category);
        } catch (Exception e) {
            logger.info("Error creating new category");
            throw e;
        }
    }
}
