package com.example.mini_ecommerce_api.service;


import com.example.mini_ecommerce_api.dto.CreateProductRequestDto;
import com.example.mini_ecommerce_api.dto.ProductResponseDto;

public interface IProductService {
    ProductResponseDto createProduct(CreateProductRequestDto dto);
}
