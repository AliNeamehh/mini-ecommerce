package com.example.mini_ecommerce_api.repository;


import com.example.mini_ecommerce_api.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

}