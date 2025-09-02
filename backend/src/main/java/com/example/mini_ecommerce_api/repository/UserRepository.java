package com.example.mini_ecommerce_api.repository;

import com.example.mini_ecommerce_api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

}