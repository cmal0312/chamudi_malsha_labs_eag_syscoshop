package com.syscoshop.product_service.repository;

import com.syscoshop.product_service.model.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SupplierRepository extends JpaRepository<Supplier, Long> {
}
