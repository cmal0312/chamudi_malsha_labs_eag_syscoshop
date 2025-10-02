package com.syscoshop.product_service.repository;

import com.syscoshop.product_service.model.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SupplierRepository extends JpaRepository<Supplier, Long> {
    Optional<Supplier> findByCognitoId(String supplierId);
}
