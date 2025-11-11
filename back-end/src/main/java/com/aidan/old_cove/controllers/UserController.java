package com.aidan.old_cove.controllers;

import com.aidan.old_cove.models.User;
import com.aidan.old_cove.repositories.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/id/{id}")
    public User getUser( @PathVariable int id ) {
        return userRepository.findById(id).orElse(null);
    }

    @PostMapping
    User addUser( @RequestBody User user ) {
        return userRepository.save(user);
    }

    @PutMapping("/id/{id}")
    public User updateUser( @PathVariable int id, @RequestBody User user) {
        user.setId(id);
        return userRepository.save(user);
    }

    @DeleteMapping("/id/{id}")
    public User deleteUser( @PathVariable int id ) {
        User deletedUser = userRepository.findById(id).orElse(null);
        userRepository.deleteById(id);
        return deletedUser;
    }
}

// TODO test these and commit!
