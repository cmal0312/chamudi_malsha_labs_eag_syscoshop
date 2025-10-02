package com.syscoshop.product_service.mapper;

import com.syscoshop.product_service.dto.SupplierDTO;
import com.syscoshop.product_service.model.Supplier;
import com.syscoshop.product_service.repository.ProductRepository;
import org.springframework.stereotype.Component;

@Component
public class SupplierMapper {

    private final ProductRepository productRepository;

    public SupplierMapper(ProductRepository productRepository){
        this.productRepository = productRepository;
    }

    public SupplierDTO convertToDTO(Supplier supplier){

        SupplierDTO supplierDTO = new SupplierDTO();
        supplierDTO.setId(supplier.getId());
        supplierDTO.setName(supplier.getName());
        supplierDTO.setCognitoId(supplier.getCognitoId());
        return supplierDTO;
    }

    public Supplier convertToEntity(SupplierDTO supplierDTO){

        Supplier supplier = new Supplier();
        supplier.setId(supplierDTO.getId());
        supplier.setCognitoId(supplierDTO.getCognitoId());
        supplier.setName(supplierDTO.getName());
        return supplier;
    }

}
