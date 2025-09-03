package com.example.mini_ecommerce_api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderAdminRowDto {

    private Long id;
    private String userName;
    private double totalAmount;
    private String status;
    private Instant createdAt;

}
