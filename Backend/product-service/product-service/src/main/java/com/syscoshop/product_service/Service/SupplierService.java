package com.syscoshop.product_service.Service;

import com.syscoshop.product_service.dto.SupplierDTO;

import java.util.List;

public interface SupplierService {

    List<SupplierDTO> getSuppliers();

    SupplierDTO getSupplierById(Long id);

    SupplierDTO createSupplier(SupplierDTO supplierDTO);

    void deleteSupplier(Long id);
}
