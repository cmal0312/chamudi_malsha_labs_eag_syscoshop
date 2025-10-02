package com.syscoshop.product_service.Service.impl;


import com.syscoshop.product_service.Service.SupplierService;
import com.syscoshop.product_service.dto.SupplierDTO;
import com.syscoshop.product_service.exception.ResourceNotFoundException;
import com.syscoshop.product_service.mapper.SupplierMapper;
import com.syscoshop.product_service.model.Supplier;
import com.syscoshop.product_service.repository.SupplierRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SupplierServiceImpl implements SupplierService {

    private final SupplierRepository supplierRepository;
    private final SupplierMapper supplierMapper;

    public SupplierServiceImpl(SupplierRepository supplierRepository, SupplierMapper supplierMapper){
        this.supplierRepository =  supplierRepository;
        this.supplierMapper = supplierMapper;
    }

    @Override
    public List<SupplierDTO> getSuppliers(){
        return supplierRepository.findAll()
                .stream()
                .map(supplierMapper::convertToDTO)
                .toList();
    }

    @Override
    public SupplierDTO getSupplierById(String id){
        Supplier supplier = supplierRepository.findByCognitoId(id)
                .orElseGet(() -> {
                    Supplier newSupplier = new Supplier();
                    newSupplier.setCognitoId(id);
                    newSupplier.setName(id);
                    return supplierRepository.save(newSupplier);
                });
        return supplierMapper.convertToDTO(supplier);
    }

    @Override
    public SupplierDTO createSupplier(SupplierDTO supplierDTO){
        Supplier supplier = supplierMapper.convertToEntity(supplierDTO);
        Supplier saved = supplierRepository.save(supplier);
        return supplierMapper.convertToDTO(saved);
    }

    @Override
    public void deleteSupplier(String id) {
        Supplier supplier = supplierRepository.findByCognitoId(id)
                .orElseThrow(() -> new ResourceNotFoundException("Supplier not found for Cognito ID: " + id));

        supplierRepository.delete(supplier);
    }
}
