package com.example.mini_ecommerce_api.controller;


import com.example.mini_ecommerce_api.dto.CreateOrderRequest;
import com.example.mini_ecommerce_api.dto.OrderAdminRowDto;
import com.example.mini_ecommerce_api.dto.OrderDto;
import com.example.mini_ecommerce_api.service.IOrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@Tag(name = "orders Management", description = "APIs for managing orders")
public class OrderController {


    private final IOrderService orderService;

    public OrderController(IOrderService orderService) {
        this.orderService = orderService;
    }


    @PostMapping
    public ResponseEntity<OrderDto> placeOrder(@AuthenticationPrincipal(expression="id") Long userId  , @RequestBody CreateOrderRequest req) {
        OrderDto orderDto = orderService.placeOrder(userId, req);
        return ResponseEntity.ok(orderDto);

    }



    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Get all orders")
    public ResponseEntity<List<OrderAdminRowDto>> getAllOrders() {
        return ResponseEntity.ok(orderService.listAllOrders());
    }

}
