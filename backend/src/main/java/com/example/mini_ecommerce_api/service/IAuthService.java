package com.example.mini_ecommerce_api.service;

import com.example.mini_ecommerce_api.dto.AuthResponse;
import com.example.mini_ecommerce_api.dto.LoginRequest;
import com.example.mini_ecommerce_api.dto.RegisterRequest;

public interface IAuthService {
    void register(RegisterRequest dto);
    String login(LoginRequest request);
}
