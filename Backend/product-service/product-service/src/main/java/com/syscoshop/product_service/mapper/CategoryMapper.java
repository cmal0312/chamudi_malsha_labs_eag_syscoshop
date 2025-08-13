package com.syscoshop.product_service.mapper;

import com.syscoshop.product_service.dto.CategoryDTO;
import com.syscoshop.product_service.model.Category;
import com.syscoshop.product_service.repository.CategoryRepository;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapper {

    private final CategoryRepository categoryRepository;

    public CategoryMapper(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public CategoryDTO convertToDTO(Category category){

        CategoryDTO categoryDTO = new CategoryDTO();
        categoryDTO.setId(category.getId());
        categoryDTO.setName(category.getName());
        categoryDTO.setDescription(category.getDescription());
        return categoryDTO;
    }

}
