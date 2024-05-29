package com.acds.inventory_management_system.service;
import com.acds.inventory_management_system.model.Product;
import java.util.List;

public interface ProductService {
    Product createProduct(Product product);
    Product getProductById(Long productId);
    List<Product> getAllProducts();
    Product updateProduct(Product product);
    void deleteProduct(long productId);
}
