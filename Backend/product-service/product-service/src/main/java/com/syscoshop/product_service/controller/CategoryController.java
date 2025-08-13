package com.syscoshop.product_service.controller;

import com.syscoshop.product_service.Service.CategoryService;
import com.syscoshop.product_service.dto.CategoryDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(AbstractController.BASE_PATH + "/categories")
public class CategoryController extends AbstractController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService){
        this.categoryService =  categoryService;
    }

    @GetMapping
    public ResponseEntity<?> getAllCategories(){
        logger.info("Fetching categories");
        List<CategoryDTO> categories = categoryService.getAllCategories();
        return buildSuccessResponse(categories);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCategoryById(@PathVariable Long id){
        logger.info("Fetching product with ID: {}", id);
        CategoryDTO category =  categoryService.getCategoryById(id);
        return buildSuccessResponse(category);
    }

    @PostMapping
    public ResponseEntity<?> createCategory(@RequestBody CategoryDTO categoryDTO){
        logger.info("creating new category: {}", categoryDTO.getName());
        CategoryDTO category =  categoryService.createCategory(categoryDTO);
        return buildSuccessResponse(category);
    }
}
