package com.example.mini_ecommerce_api.controller;


import com.example.mini_ecommerce_api.dto.CreateOrderRequest;
import com.example.mini_ecommerce_api.dto.OrderDto;
import com.example.mini_ecommerce_api.service.IOrderService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/orders")
@Tag(name = "orders Management", description = "APIs for managing orders")
public class OrderController {


    private final IOrderService orderService;

    public OrderController(IOrderService orderService) {
        this.orderService = orderService;
    }


    @PostMapping
    public ResponseEntity<OrderDto> placeOrder( @AuthenticationPrinciple(expression="id") Long userId  ,@RequestBody CreateOrderRequest req) {

    }






}
