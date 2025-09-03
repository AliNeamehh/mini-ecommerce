package com.example.mini_ecommerce_api.dto;

import lombok.Data;

@Data
public class OrderItemDto {

    private Long productId;
    private String productName;
    private double price;
    private int quantity;
    private double lineTotal;

}
