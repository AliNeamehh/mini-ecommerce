package com.example.mini_ecommerce_api.service;

import com.example.mini_ecommerce_api.dto.CreateProductRequestDto;
import com.example.mini_ecommerce_api.dto.ProductResponseDto;
import com.example.mini_ecommerce_api.mapper.ProductMapper;
import com.example.mini_ecommerce_api.repository.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService implements IProductService {

    private final ProductRepository productRepository;
    private final ProductMapper mapper;


    public ProductService(ProductRepository productRepo, ProductMapper mapper) {
        this.productRepository = productRepo;
        this.mapper = mapper;
    }


    public Page<ProductResponseDto > getAllProducts(Pageable pageable) {

        return productRepository.findAll(pageable).map(mapper::toDto);
    }



    @Override
    public ProductResponseDto createProduct(CreateProductRequestDto dto) {
        return mapper.toDto(productRepository.save(mapper.toEntity(dto)));
    }

    @Override
    public List<ProductResponseDto> getLowStockProducts(int threshold) {

        return productRepository.findByStockQuantityLessThan(threshold).stream().map(mapper::toDto).collect(Collectors.toList());
    }


}
