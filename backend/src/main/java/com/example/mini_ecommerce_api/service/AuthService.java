package com.example.mini_ecommerce_api.service;
import com.example.mini_ecommerce_api.config.UserDetailsServiceImpl;
import com.example.mini_ecommerce_api.dto.LoginRequest;
import com.example.mini_ecommerce_api.dto.RegisterRequest;
import com.example.mini_ecommerce_api.exception.UserAreadyExit;
import com.example.mini_ecommerce_api.mapper.UserMapper;
import com.example.mini_ecommerce_api.model.User;
import com.example.mini_ecommerce_api.model.enums.UserRole;
import com.example.mini_ecommerce_api.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService implements IAuthService {


    private final UserRepository userRepository;

    private final JWTService jwtService;

    private final UserMapper userMapper;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    private final UserDetailsServiceImpl userDetailsService;

    public AuthService(UserRepository userRepository, JWTService jwtService, UserMapper userMapper, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, UserDetailsServiceImpl userDetailsService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
    }


    public String login(LoginRequest request) {

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        if (authentication.isAuthenticated()) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());


            return jwtService.generatedToken(userDetails);

        } else {
            return "fails";
        }

    }


    public void register(RegisterRequest dto) {

        Optional<User> optionalUser = userRepository.findByEmail(dto.getEmail());

        if (optionalUser.isPresent()) {

            throw new UserAreadyExit("the user is already registered");

        }

        User newUser = userMapper.toEntity(dto);
        newUser.setPassword(passwordEncoder.encode(dto.getPassword()));
        newUser.setRole(UserRole.USER);

        userRepository.save(newUser);
    }

}
