package com.acds.inventory_management_system.service.impl;

import com.acds.inventory_management_system.model.Admin;
import com.acds.inventory_management_system.model.ProductBatch;
import com.acds.inventory_management_system.repository.AdminRepository;
import com.acds.inventory_management_system.repository.ProductBatchRepository;
import com.acds.inventory_management_system.service.ProductBatchService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ProductBatchServiceImpl implements ProductBatchService{
    private ProductBatchRepository productBatchRepository;

    @Override
    public ProductBatch createProductBatch(ProductBatch productBatch){
        return productBatchRepository.save(productBatch);
    }

    @Override
    public ProductBatch getProductBatchById(Long productBatchId){
        Optional<ProductBatch> optionalProductBatch = productBatchRepository.findById(productBatchId);
        return optionalProductBatch.get();
    }

    @Override
    public List<ProductBatch> getAllProductBatches(){
        return productBatchRepository.findAll();
    }

    @Override
    public ProductBatch updateProductBatch(ProductBatch productBatch){
        ProductBatch existingProductBatch = productBatchRepository.findById(productBatch.getId()).get();
        existingProductBatch.setProduct(productBatch.getProduct());
        existingProductBatch.setExpiration(productBatch.getExpiration());
        existingProductBatch.setQuantity(productBatch.getQuantity());


        ProductBatch updatedProductBatch = productBatchRepository.save(existingProductBatch);
        return updatedProductBatch;
    }

    @Override
    public void deleteProductBatch(long productBatchId) {
        productBatchRepository.deleteById(productBatchId);
    }
}
