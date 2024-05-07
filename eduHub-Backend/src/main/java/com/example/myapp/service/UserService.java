package com.example.myapp.service;

import com.example.myapp.model.User;
import com.example.myapp.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder; // Import PasswordEncoder
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder; // Add PasswordEncoder

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) { // Modify constructor
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder; // Assign passwordEncoder
    }

 
    public boolean resetPassword(String email, String newPassword) {
        if (email == null || newPassword == null) {
            return false;
        }
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);
            return true;
        }
        return false;
    }

}
