package com.example.myapp.service;

import com.example.myapp.entities.User;
import com.example.myapp.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder; // Import PasswordEncoder
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder; // Add PasswordEncoder

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) { // Modify constructor
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder; // Assign passwordEncoder
    }

    public List<User> allUsers() {
        List<User> users = new ArrayList<>();

        userRepository.findAll().forEach(users::add);

        return users;
    }
    
    public User getUserById(Integer id) {
        return userRepository.findById(id)
                .orElseThrow();
    }

    public User updateUser(Integer id, User userDetails) {
        User user = userRepository.findById(id)
                .orElseThrow();

        // Update user details
        user.setUserName(userDetails.getUserName());
        user.setEmail(userDetails.getEmail());
        user.setPassword(userDetails.getPassword());

        return userRepository.save(user);
    }

    public void deleteUser(Integer id) {
        User user = userRepository.findById(id)
                .orElseThrow();

        userRepository.delete(user);
    }
    
    public boolean resetPassword(String email, String newPassword) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent()) { // Check if user exists
            User user = optionalUser.get();
            user.setPassword(passwordEncoder.encode(newPassword)); // Encode password
            userRepository.save(user); // Save user with new password
            return true;
        }
        return false;
    }
}
