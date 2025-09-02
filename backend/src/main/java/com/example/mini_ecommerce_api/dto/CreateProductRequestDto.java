package com.example.mini_ecommerce_api.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateProductRequestDto {

    @NotBlank
    String name;
    String description;
    @NotNull
    @Min(0)
    double price;
    @NotNull
    @Min(0)
    int stockQuantity;
}
