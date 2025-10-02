package com.syscoshop.product_service.Service.impl;

import com.syscoshop.product_service.Service.ProductService;
import com.syscoshop.product_service.dto.ProductDTO;
import com.syscoshop.product_service.exception.ResourceNotFoundException;
import com.syscoshop.product_service.mapper.ProductMapper;
import com.syscoshop.product_service.model.Product;
import com.syscoshop.product_service.repository.CategoryRepository;
import com.syscoshop.product_service.repository.ProductRepository;
import com.syscoshop.product_service.repository.SupplierRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    private final SupplierRepository supplierRepository;
    private final CategoryRepository categoryRepository;

    public ProductServiceImpl(ProductRepository productRepository, ProductMapper productMapper, SupplierRepository supplierRepository, CategoryRepository categoryRepository){
        this.productRepository = productRepository;
        this.productMapper = productMapper;
        this.supplierRepository = supplierRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<ProductDTO> getProductsForAdmin(String name, Long id, Long supplierId){

        List<Product> filteredProducts;

        if( name != null && id != null){
            filteredProducts = productRepository.findByNameContainingIgnoreCaseAndCategory_IdAndApprovedFalse(name, id);
        } else if (name != null) {
            filteredProducts = productRepository.findByNameContainingIgnoreCaseAndApprovedFalse(name);
        } else if (id != null){
            filteredProducts = productRepository.findByCategory_IdAndApprovedFalse(id);
        } else if (supplierId != null){
            filteredProducts = productRepository.findBySupplier_IdAndApprovedFalse(supplierId);
        }
        else{
            filteredProducts = productRepository.findByApprovedFalse();
        }
        return filteredProducts
                .stream()
                .map(productMapper::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductDTO> getProductsForCustomer(String name, Long id, Long supplierId){

        List<Product> filteredProducts;

        if( name != null && id != null){
            filteredProducts = productRepository.findByNameContainingIgnoreCaseAndCategory_IdAndApprovedTrue(name, id);
        } else if (name != null) {
            filteredProducts = productRepository.findByNameContainingIgnoreCaseAndApprovedTrue(name);
        } else if (id != null){
            filteredProducts = productRepository.findByCategory_IdAndApprovedTrue(id);
        } else if (supplierId != null){
            filteredProducts = productRepository.findBySupplier_IdAndApprovedTrue(supplierId);
        }
        else{
            filteredProducts = productRepository.findByApprovedTrue();
        }
        return filteredProducts
                .stream()
                .map(productMapper::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ProductDTO getProductById(Long id){
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with the ID "+ id));
        return productMapper.convertToDTO(product);
    }

    @Override
    public ProductDTO createProduct(ProductDTO productDTO){
        Product product = productMapper.convertToEntity(productDTO);
        product.setApproved(false);
        Product saved = productRepository.save(product);
        return productMapper.convertToDTO(saved);
    }

    @Override
    public ProductDTO updateProduct(Long id, ProductDTO productDTO){
        Product existing = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found for ID: "+ id));

        existing.setName(productDTO.getName());
        existing.setDescription(productDTO.getDescription());
        existing.setAvailable(productDTO.getAvailable());
        existing.setPrice(productDTO.getPrice());
        existing.setSupplier(supplierRepository.findByCognitoId(productDTO.getSupplierId())
                .orElseThrow(() -> new ResourceNotFoundException("Supplier not found for ID: "+ productDTO.getSupplierId())));

        existing.setApproved(productDTO.getApproved());

        existing.setCategory(categoryRepository.findById(productDTO.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found for ID: "+ productDTO.getCategoryId())));

        Product updated = productRepository.save(existing);
        return productMapper.convertToDTO(updated);

    }

    @Override
    public void deleteProduct(Long id){
        if(!productRepository.existsById(id)){
            throw new ResourceNotFoundException("Product not found for ID: "+ id);
        }
        productRepository.deleteById(id);
    }
    
}
