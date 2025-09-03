package com.example.mini_ecommerce_api.mapper;

import com.example.mini_ecommerce_api.dto.RegisterRequest;
import com.example.mini_ecommerce_api.model.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User toEntity (RegisterRequest dto);

}