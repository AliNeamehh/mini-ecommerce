package com.example.mini_ecommerce_api.mapper;


import com.example.mini_ecommerce_api.dto.OrderDto;
import com.example.mini_ecommerce_api.model.Order;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = OrderItemMapper.class)
public interface OrderMapper {
    @Mapping(
            target = "status",
            expression = "java(order.getStatus() == null ? null : order.getStatus().name())"
    )
    OrderDto toDto(Order order);



}
