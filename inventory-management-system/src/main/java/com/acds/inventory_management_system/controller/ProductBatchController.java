package com.acds.inventory_management_system.controller;
import lombok.AllArgsConstructor;
import com.acds.inventory_management_system.model.ProductBatch;
import com.acds.inventory_management_system.service.ProductBatchService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/productBatches")
public class ProductBatchController {
    private ProductBatchService productBatchService;

    @PostMapping
    public ResponseEntity<ProductBatch> createProductBatch(@RequestBody ProductBatch productBatch){
        ProductBatch saveProductBatch = productBatchService.createProductBatch(productBatch);
        return new ResponseEntity<>(saveProductBatch, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<ProductBatch> getProductBatchById(@PathVariable("id") Long productBatchId){
        ProductBatch productBatch = productBatchService.getProductBatchById(productBatchId);
        return new ResponseEntity<>(productBatch, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<ProductBatch>> getAllProductBatches(){
        List<ProductBatch> productBatches = productBatchService.getAllProductBatches();
        return new ResponseEntity<>(productBatches, HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<ProductBatch> updateProductBatch(@PathVariable("id") Long productBatchId, @RequestBody ProductBatch productBatch){
        productBatch.setId(productBatchId);
        ProductBatch updatedProductBatch = productBatchService.updateProductBatch(productBatch);
        return new ResponseEntity<>(updatedProductBatch, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteProductBatch(@PathVariable("id") Long productBatchId){
        productBatchService.deleteProductBatch(productBatchId);
        return new ResponseEntity<>("ProductBatch successfully deleted!", HttpStatus.OK);
    }
}
