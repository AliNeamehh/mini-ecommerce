package com.example.mini_ecommerce_api.service;


import com.example.mini_ecommerce_api.dto.CreateOrderRequest;
import com.example.mini_ecommerce_api.dto.OrderDto;
import com.example.mini_ecommerce_api.exception.BadRequestException;
import com.example.mini_ecommerce_api.exception.NotFoundException;
import com.example.mini_ecommerce_api.mapper.OrderMapper;
import com.example.mini_ecommerce_api.model.Order;
import com.example.mini_ecommerce_api.model.OrderItem;
import com.example.mini_ecommerce_api.model.User;
import com.example.mini_ecommerce_api.repository.OrderItemRepository;
import com.example.mini_ecommerce_api.repository.OrderRepository;
import com.example.mini_ecommerce_api.repository.ProductRepository;
import com.example.mini_ecommerce_api.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService implements IOrderService {


    private final UserRepository userRepo;
    private final ProductRepository productRepo;
    private final OrderRepository orderRepo;
    private final OrderItemRepository orderItemRepo;
    private final OrderMapper orderMapper;

    public OrderService(UserRepository userRepo, ProductRepository productRepo, OrderRepository orderRepo, OrderItemRepository orderItemRepo, OrderMapper orderMapper) {
        this.userRepo = userRepo;
        this.productRepo = productRepo;
        this.orderRepo = orderRepo;
        this.orderItemRepo = orderItemRepo;
        this.orderMapper = orderMapper;
    }

    @Transactional
    public OrderDto placeOrder(Long userId, CreateOrderRequest req) {

        if (req == null || req.getOrderLines() == null || req.getOrderLines().isEmpty()) {
            throw new BadRequestException("Order Data is Empty");
        }

        User user = userRepo.findById(userId).orElseThrow(() -> new NotFoundException("User not found with this Id: " + userId));


        List<OrderItem> items = new ArrayList<>();

        for (var line : req.getOrderLines()) {
            var product = productRepo.findByIdForUpdate(line.getProductId()).orElseThrow(() -> new NotFoundException("Product not found with this Id: " + line.getProductId()));
            if (product.getStockQuantity() < line.getQuantity()) {
                throw new BadRequestException("Product with id " + product.getId() + " has only " + product.getStockQuantity() + " items in stock.");

            }

            product.setStockQuantity(product.getStockQuantity() - line.getQuantity());
            productRepo.save(product);

            OrderItem orderItem = new OrderItem();
            orderItem.setProduct(product);
            orderItem.setQuantity(line.getQuantity());
            orderItem.setPrice(product.getPrice());

            items.add(orderItem);


        }

        Order order = new Order();
        order.setUser(user);
        order.setItems(items);
        order.setTotalAmount(items.stream().mapToDouble(item -> item.getPrice() * item.getQuantity()).sum());


        Order savedOrder = orderRepo.save(order);
        items.forEach(item -> item.setOrder(savedOrder));
        orderItemRepo.saveAll(items);


        return orderMapper.toDto(savedOrder);

    }

}