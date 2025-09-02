package com.example.mini_ecommerce_api.repository;
import com.example.mini_ecommerce_api.model.Product;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {

   List<Product> findByStockQuantityLessThan(int threshold);

}