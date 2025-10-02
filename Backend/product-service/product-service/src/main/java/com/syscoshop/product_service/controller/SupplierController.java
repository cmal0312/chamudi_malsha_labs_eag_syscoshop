package com.syscoshop.product_service.controller;

import com.syscoshop.product_service.Service.SupplierService;
import com.syscoshop.product_service.constants.Constants;
import com.syscoshop.product_service.dto.SupplierDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(Constants.BASE_PATH+"/suppliers")
public class SupplierController extends AbstractController {

    private final SupplierService supplierService;


    public SupplierController(SupplierService supplierService) {
        this.supplierService = supplierService;
    }

    @GetMapping
    public ResponseEntity<?> getAllSuppliers(){
        logger.info("Fetching suppliers");
        try {
            return buildSuccessResponse(supplierService.getSuppliers());
        } catch (Exception e) {
            logger.info("Error fetching suppliers from product-service");
            throw e;
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getSupplierById(@PathVariable String id){
        logger.info("Fetching supplier for id: {}", id);
        try {
            SupplierDTO supplierDTO = supplierService.getSupplierById(id);
            return buildSuccessResponse(supplierDTO);
        } catch (Exception e) {
            logger.info("Error fetching supplier from product-service");
            throw e;
        }
    }

    @PostMapping
    public ResponseEntity<?> createSupplier(@RequestBody SupplierDTO supplierDTO){
        logger.info("Creating new supplier: {}", supplierDTO.getName());
        try {
            SupplierDTO supplier = supplierService.createSupplier(supplierDTO);
            return buildSuccessResponse(supplier);
        } catch (Exception e) {
            logger.info("Error creating new supplier");
            throw e;
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSupplier(@PathVariable String id){
        logger.info("Deleting supplier with id: {}", id);
        try {
            supplierService.deleteSupplier(id);
            return buildSuccessResponse("Supplier deleted successfully");
        } catch (Exception e) {
            logger.info("Error deleting supplier");
            throw e;
        }
    }

}
