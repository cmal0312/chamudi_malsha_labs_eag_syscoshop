package com.syscoshop.product_service.repository;

import com.syscoshop.product_service.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface ProductRepository extends JpaRepository<Product, Long>{

    List<Product> findByApprovedTrue();
    List<Product> findByApprovedFalse();
    List<Product> findByNameContainingIgnoreCaseAndApprovedTrue(String name);
    List<Product> findByNameContainingIgnoreCaseAndApprovedFalse(String name);
    List<Product> findByCategory_IdAndApprovedTrue(Long id);
    List<Product> findByCategory_IdAndApprovedFalse(Long id);
    List<Product> findByNameContainingIgnoreCaseAndCategory_IdAndApprovedTrue(String name, Long id);
    List<Product> findByNameContainingIgnoreCaseAndCategory_IdAndApprovedFalse(String name, Long id);

}
