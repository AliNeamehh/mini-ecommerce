package com.example.mini_ecommerce_api.dto;

import lombok.Data;

@Data
public class AuthResponse {
    private String token;
    private Long userId;
    private String name;
    private String email;
    private String role;
}
