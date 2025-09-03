package com.example.mini_ecommerce_api.dto;

import lombok.Data;

import java.time.Instant;
import java.util.List;

@Data
public class OrderDto {
    private Long id;
    private String status;
    private double totalAmount;

    private List<OrderItemDto> items;
    private Instant createdAt;



}
