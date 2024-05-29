package com.acds.inventory_management_system.service.impl;

import com.acds.inventory_management_system.model.Product;
import com.acds.inventory_management_system.repository.ProductRepository;
import com.acds.inventory_management_system.service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService {
    private ProductRepository productRepository;

    @Override
    public Product createProduct(Product product){
        return productRepository.save(product);
    }

    @Override
    public Product getProductById(Long productId){
        Optional<Product> optionalProduct = productRepository.findById(productId);
        return optionalProduct.get();
    }

    @Override
    public List<Product> getAllProducts(){
        return productRepository.findAll();
    }

    @Override
    public Product updateProduct(Product product){
        Product existingProduct = productRepository.findById(product.getId()).get();
        existingProduct.setSupplier(product.getSupplier());
        existingProduct.setName(product.getName());
        existingProduct.setPrice(product.getPrice());
        existingProduct.setQuantity(product.getQuantity());

        Product updatedProduct = productRepository.save(existingProduct);
        return updatedProduct;
    }

    @Override
    public void deleteProduct(long productId) {
        productRepository.deleteById(productId);
    }
}
