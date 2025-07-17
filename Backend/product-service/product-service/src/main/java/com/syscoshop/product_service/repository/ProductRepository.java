package com.syscoshop.product_service.repository;

import com.syscoshop.product_service.model.Category;
import com.syscoshop.product_service.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.List;

@Component
public interface ProductRepository extends JpaRepository<Product, Long>{

    List<Product> findByNameContainingIgnoreCase(String name);
}
