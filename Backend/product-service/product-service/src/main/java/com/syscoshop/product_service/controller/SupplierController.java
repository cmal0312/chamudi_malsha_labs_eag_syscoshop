package com.syscoshop.product_service.controller;

import com.syscoshop.product_service.Service.SupplierService;
import com.syscoshop.product_service.dto.SupplierDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(AbstractController.BASE_PATH+"/suppliers")
public class SupplierController extends AbstractController {

    private final SupplierService supplierService;


    public SupplierController(SupplierService supplierService) {
        this.supplierService = supplierService;
    }

    @GetMapping
    public ResponseEntity<?> getAllSuppliers(){
        logger.info("Fetching suppliers");
        return buildSuccessResponse(supplierService.getSuppliers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getSupplierById(@PathVariable Long id){
        logger.info("Fetching supplier for id: {}", id);
        SupplierDTO supplierDTO = supplierService.getSupplierById(id);
        return buildSuccessResponse(supplierDTO);
    }

    @PostMapping
    public ResponseEntity<?> createSupplier(@RequestBody SupplierDTO supplierDTO){
        logger.info("Creating new supplier: {}", supplierDTO.getName());
        SupplierDTO supplier = supplierService.createSupplier(supplierDTO);
        return buildSuccessResponse(supplier);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSupplier(@PathVariable Long id){
        logger.info("Deleting supplier with id: {}", id);
        supplierService.deleteSupplier(id);
        return buildSuccessResponse("Product deleted successfully");
    }

}
