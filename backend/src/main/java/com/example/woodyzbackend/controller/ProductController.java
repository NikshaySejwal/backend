package com.example.woodyzbackend.controller;

import com.example.woodyzbackend.entity.Product;
import com.example.woodyzbackend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for managing the product catalog.
 * Provides endpoints for both public browsing and administrative management of products.
 * 
 * Connections:
 * - Integrates with `ProductService` for all product-related business logic.
 * - Access control is managed via `SecurityConfig`:
 *   - GET endpoints are public.
 *   - POST, PUT, and DELETE endpoints require `ROLE_ADMIN`.
 * - Exposed via `/api/products/**`.
 */
@RestController
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    private ProductService productService;

    /**
     * Retrieves all products, optionally filtered by category.
     * 
     * @param category Optional category name to filter products.
     * @return A list of `Product` entities.
     */
    @GetMapping
    public List<Product> getAllProducts(@RequestParam(required = false) String category) {
        if (category != null && !category.isEmpty()) {
            return productService.getProductsByCategory(category);
        }
        return productService.getAllProducts();
    }

    /**
     * Retrieves a single product by its ID.
     * 
     * @param id The unique identifier of the product.
     * @return The requested `Product` entity.
     */
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    /**
     * Creates a new product in the catalog. 
     * Requires `ROLE_ADMIN` authorization.
     * 
     * @param product The product details to save.
     * @return The created `Product` entity.
     */
    @PostMapping("/")
    public Product createProduct(@RequestBody Product product) {
        return productService.saveProduct(product);
    }

    /**
     * Updates an existing product. 
     * Requires `ROLE_ADMIN` authorization.
     * 
     * @param id The ID of the product to update.
     * @param product The updated product details.
     * @return The updated `Product` entity.
     */
    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody Product product) {
        product.setId(id);
        return productService.saveProduct(product);
    }

    /**
     * Deletes a product from the catalog. 
     * Requires `ROLE_ADMIN` authorization.
     * 
     * @param id The ID of the product to delete.
     */
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
    }
}
