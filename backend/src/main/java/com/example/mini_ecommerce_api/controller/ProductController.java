package com.example.mini_ecommerce_api.controller;


import com.example.mini_ecommerce_api.dto.CreateProductRequestDto;
import com.example.mini_ecommerce_api.dto.ProductResponseDto;
import com.example.mini_ecommerce_api.service.IProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/products")
@Tag(name = "Product Management", description = "APIs for managing products")
public class ProductController {

    private final IProductService productService;

    public ProductController(IProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    @Operation(summary = "Get all products with pagination")
    public ResponseEntity<Page<ProductResponseDto >>  getAllProducts(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(productService.getAllProducts(PageRequest.of(page, size)));
    }




    @PostMapping
    @Operation(summary = "Create a new product")
    public ResponseEntity<ProductResponseDto> createProduct( @Valid  @RequestBody CreateProductRequestDto dto) {
        ProductResponseDto productResponseDto = productService.createProduct(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(productResponseDto);
    }



}
