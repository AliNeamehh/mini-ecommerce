package com.example.mini_ecommerce_api.dto;


import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class OrderLine {
    @NotNull
    private Long productId;

    @Min(1)
    private int quantity;
}
