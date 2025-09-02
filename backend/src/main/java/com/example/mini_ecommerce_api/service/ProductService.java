package com.example.mini_ecommerce_api.service;

import com.example.mini_ecommerce_api.dto.CreateProductRequestDto;
import com.example.mini_ecommerce_api.dto.ProductResponseDto;
import com.example.mini_ecommerce_api.mapper.ProductMapper;
import com.example.mini_ecommerce_api.repository.ProductRepository;
import org.springframework.stereotype.Service;

@Service
public class ProductService implements IProductService {

    private final ProductRepository productRepository;
    private final ProductMapper mapper;


    public ProductService(ProductRepository productRepo, ProductMapper mapper) {
        this.productRepository = productRepo;
        this.mapper = mapper;
    }

    @Override
    public ProductResponseDto createProduct(CreateProductRequestDto dto) {
        return mapper.toDto(productRepository.save(mapper.toEntity(dto)));
    }



}
