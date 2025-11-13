package com.aidan.old_cove.controllers;

import com.aidan.old_cove.models.User;
import com.aidan.old_cove.repositories.UserRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.List;

@RestController
@RequestMapping("/users")
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

        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found.");
    }

    // C R U D

    // Create Account
    @PostMapping
    User addUser( @RequestBody User user ) {

        String name = user.getName();

        try {
            findUserByName(name);
        } catch(Exception e) {
            // user does not exist, can create
            return userRepository.save(user);
        }

        //user exists, cannot create
        throw new ResponseStatusException(HttpStatus.CONFLICT, "Username '" + name + "' has already been used.");

    }

    // Log in
    @GetMapping("/{name}")
    public User getUserByNameAndPassword ( @PathVariable String name, @RequestHeader("Authorization") String password ) {

        User user = findUserByName(name);
        String userPassword = user.getPassword();

        if (userPassword.equals(password)) {
            return user;
        }

        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Incorrect password.");
    }

    // Update Save Game
    @PutMapping("/{name}")
    public User updateUser( @PathVariable String name, @RequestHeader("Authorization") String password, @RequestBody User userData) {

        User oldData = findUserByName(name);
        int id = oldData.getId();

        userData.setId(id);
        return userRepository.save(userData);
    }

    // Delete Account
    @DeleteMapping("/{name}")
    public User deleteUser( @PathVariable String name, @RequestHeader("Authorization") String password ) {

        User user = findUserByName(name);
        String userPassword = user.getPassword();

        if (userPassword.equals(password)) {

            int deleteUserId = user.getId();
            userRepository.deleteById(deleteUserId);
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, name + " has been deleted!");
        }

        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Incorrect password.");
    }
}
