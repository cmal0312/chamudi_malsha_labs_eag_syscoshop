package com.syscoshop.product_service.Service.impl;

import com.syscoshop.product_service.Service.CategoryService;
import com.syscoshop.product_service.dto.CategoryDTO;
import com.syscoshop.product_service.exception.ResourceNotFoundException;
import com.syscoshop.product_service.model.Category;
import com.syscoshop.product_service.repository.CategoryRepository;
import com.syscoshop.product_service.mapper.CategoryMapper;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;


    public CategoryServiceImpl(CategoryRepository categoryRepository, CategoryMapper categoryMapper) {
        this.categoryRepository = categoryRepository;
        this.categoryMapper = categoryMapper;
    }

    @Override
    public List<CategoryDTO> getAllCategories(){

        return categoryRepository.findAll()
                .stream()
                .map(categoryMapper::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public CategoryDTO getCategoryById(Long id){

        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("category not found for the id: "+ id));
        return categoryMapper.convertToDTO(category);
    }

    @Override
    public CategoryDTO createCategory(CategoryDTO categoryDTO){

        Category category = new Category();
        category.setId(categoryDTO.getId());
        category.setName(categoryDTO.getName());
        category.setDescription(categoryDTO.getDescription());
        category = categoryRepository.save(category);
        return categoryMapper.convertToDTO(category);
    }

}
