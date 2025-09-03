package com.example.mini_ecommerce_api.service;

import com.example.mini_ecommerce_api.dto.CreateOrderRequest;
import com.example.mini_ecommerce_api.dto.OrderAdminRowDto;
import com.example.mini_ecommerce_api.dto.OrderDto;

import java.util.List;

public interface IOrderService {
    OrderDto placeOrder(Long userId, CreateOrderRequest req);
    List<OrderAdminRowDto> listAllOrders();
}
