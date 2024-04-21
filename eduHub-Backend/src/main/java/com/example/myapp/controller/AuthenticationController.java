package com.example.myapp.controller;

import com.example.myapp.entities.User;
import com.example.myapp.dtos.LoginUserDto;
import com.example.myapp.dtos.RegisterUserDto;
import com.example.myapp.responses.LoginResponse;
import com.example.myapp.responses.SignupResponseDto;
import com.example.myapp.service.AuthenticationService;
import com.example.myapp.service.JwtService;
import com.example.myapp.service.UserService;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin("*")
@RequestMapping("/auth")
@RestController
public class AuthenticationController {
    private final JwtService jwtService;
    private final UserService userService;
    private final AuthenticationService authenticationService;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService, UserService userService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
        this.userService = userService;
    }
  

    @PostMapping("/signup")
    public ResponseEntity<SignupResponseDto> register(@RequestBody RegisterUserDto registerUserDto) {
        User registeredUser = authenticationService.signup(registerUserDto);
        
        // Create a response DTO with only necessary information
        SignupResponseDto responseDto = new SignupResponseDto();
        responseDto.setUserName(registeredUser.getUserName());
        responseDto.setEmail(registeredUser.getEmail());
        responseDto.setMessage("User registered successfully");

        return ResponseEntity.ok(responseDto);
    }
    

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto loginUserDto) {
        User authenticatedUser = authenticationService.authenticate(loginUserDto);

        String jwtToken = jwtService.generateToken(authenticatedUser);

        LoginResponse loginResponse = new LoginResponse().setToken(jwtToken).setExpiresIn(jwtService.getExpirationTime());

        return ResponseEntity.ok(loginResponse);
    }
    
    @PostMapping("/reset-password")
    public ResponseEntity<Map<String, String>> resetPassword(@RequestBody Map<String, String> resetRequest) {
        String email = resetRequest.get("email");
        String newPassword = resetRequest.get("newPassword");

        boolean resetSuccessful = userService.resetPassword(email, newPassword);
        if (resetSuccessful) {
            return ResponseEntity.ok().body(Map.of("message", "Password Reset Successfully"));
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "User not found"));
    }

}