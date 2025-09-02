package com.example.mini_ecommerce_api.service;


import com.example.mini_ecommerce_api.dto.CreateProductRequestDto;
import com.example.mini_ecommerce_api.dto.ProductResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IProductService {
    Page<ProductResponseDto > getAllProducts(Pageable pageable);
    ProductResponseDto createProduct(CreateProductRequestDto dto);
}
