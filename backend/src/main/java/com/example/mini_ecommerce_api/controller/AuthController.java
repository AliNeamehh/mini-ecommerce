package com.example.mini_ecommerce_api.controller;


import com.example.mini_ecommerce_api.dto.LoginRequest;
import com.example.mini_ecommerce_api.dto.RegisterRequest;
import com.example.mini_ecommerce_api.service.IAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")

public class AuthController {

   private final IAuthService authService;


    public AuthController(IAuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest dto){
        authService.register(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body("register successFully");
    }


    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request){

        return ResponseEntity.ok(authService.login(request));


    }



}
