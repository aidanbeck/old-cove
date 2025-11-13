package com.aidan.old_cove.repositories;
import com.aidan.old_cove.models.User;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByName(String name);
}