package com.example.mini_ecommerce_api.mapper;


import com.example.mini_ecommerce_api.dto.OrderItemDto;
import com.example.mini_ecommerce_api.model.OrderItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface OrderItemMapper {

    @Mapping(target = "productId", source = "product.id")
    @Mapping(target = "productName", source = "product.name")
    @Mapping(target = "lineTotal", expression = "java(entity.getPrice() * entity.getQuantity())")
    OrderItemDto toDto(OrderItem entity);

}
