package com.example.mini_ecommerce_api.dto;

import lombok.Data;

import java.time.Instant;

@Data
public class OrderAdminRowDto {

    private Long id;
    private String userName;
    private double totalAmount;
    private String status;
    private Instant createdAt;

}
