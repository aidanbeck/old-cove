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

    // Helper
    private User findUserByName(String name) {

        List<User> Users = getAllUsers();

        for (User user : Users) { // baby authentication, use something better.

            String userName = user.getName();

            if (userName.equals(name)) {
                return user;
            }
        }

        return null; // cannot find user with that name.
    }

    // C R U D

    @PostMapping
    User addUser( @RequestBody User user ) {
        return userRepository.save(user);
    }

    @GetMapping("/{name}")
    public User getUserByNameAndPassword ( @PathVariable String name, @RequestHeader("Authorization") String password ) {

        User user = findUserByName(name);
        String userPassword = user.getPassword();

        if (userPassword.equals(password)) {
            return user;
        }

        return null;
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
