package com.example.mini_ecommerce_api.exception;

public class UserAreadyExit extends RuntimeException {
    public UserAreadyExit(String message) {
        super(message);
    }
}
