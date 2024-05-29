package com.acds.inventory_management_system.service;
import com.acds.inventory_management_system.model.ProductBatch;
import java.util.List;
public interface ProductBatchService {
    ProductBatch createProductBatch(ProductBatch productBatch);
    ProductBatch getProductBatchById(Long productBatchId);
    List<ProductBatch> getAllProductBatches();
    ProductBatch updateProductBatch(ProductBatch productBatch);
    void deleteProductBatch(long productBatchId);
}
