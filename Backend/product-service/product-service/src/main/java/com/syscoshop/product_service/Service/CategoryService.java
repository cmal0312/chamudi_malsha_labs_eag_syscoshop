package com.syscoshop.product_service.Service;

import com.syscoshop.product_service.dto.CategoryDTO;

import java.util.List;

public interface CategoryService  {

    List<CategoryDTO> getAllCategories();

    CategoryDTO getCategoryById(Long id);

    CategoryDTO createCategory(CategoryDTO categoryDTO);

}
