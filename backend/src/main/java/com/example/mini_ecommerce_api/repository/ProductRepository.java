package com.example.mini_ecommerce_api.repository;
import com.example.mini_ecommerce_api.model.Product;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {

   List<Product> findByStockQuantityLessThan(int threshold);

   @Lock(LockModeType.PESSIMISTIC_WRITE)
   @Query("SELECT p FROM Product p WHERE p.id = :id")
   Optional<Product> findByIdForUpdate( @Param("id") long id);

}