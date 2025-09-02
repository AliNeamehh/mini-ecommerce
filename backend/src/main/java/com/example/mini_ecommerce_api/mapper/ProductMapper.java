package com.example.mini_ecommerce_api.mapper;

import com.example.mini_ecommerce_api.dto.CreateProductRequestDto;
import com.example.mini_ecommerce_api.dto.ProductResponseDto;
import com.example.mini_ecommerce_api.model.Product;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    Product toEntity (CreateProductRequestDto dto);
    ProductResponseDto toDto (Product entity);
}
