package com.example.mini_ecommerce_api.service;


import com.example.mini_ecommerce_api.dto.CreateProductRequestDto;
import com.example.mini_ecommerce_api.dto.ProductResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IProductService {
    Page<ProductResponseDto > getAllProducts(Pageable pageable);
    ProductResponseDto createProduct(CreateProductRequestDto dto);
    List<ProductResponseDto> getLowStockProducts(int threshold);
}
