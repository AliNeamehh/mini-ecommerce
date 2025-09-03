package com.example.mini_ecommerce_api.config;

import com.example.mini_ecommerce_api.model.User;
import com.example.mini_ecommerce_api.model.enums.UserRole;
import com.example.mini_ecommerce_api.repository.UserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AdminUserConfig {


    @Bean
    public User adminUser(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        User admin = new User();
        admin.setEmail("admin@gmail.com");
        admin.setPassword(passwordEncoder.encode("admin"));
        admin.setRole(UserRole.ADMIN);
        return userRepository.save(admin);
    }

}
