package com.example.woodyzbackend.service;

import com.example.woodyzbackend.entity.Product;
import com.example.woodyzbackend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Cacheable(value = "products")
    public List<Product> getAllProducts() {
        return StreamSupport.stream(productRepository.findAll().spliterator(), false)
                            .collect(Collectors.toList());
    }

    @Cacheable(value = "products", key = "#category")
    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategory(category);
    }

    @Cacheable(value = "products", key = "#id")
    @SuppressWarnings("null")
    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    @CacheEvict(value = "products", allEntries = true)
    @SuppressWarnings("null")
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    @CacheEvict(value = "products", allEntries = true)
    @SuppressWarnings("null")
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}
