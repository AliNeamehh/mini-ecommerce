package com.example.mini_ecommerce_api.dto;

import lombok.Data;

@Data
public class ProductResponseDto {
    Long id;
    String name;
    String description;
    double price;
    int stockQuantity;
}
