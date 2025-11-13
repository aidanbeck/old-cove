package com.aidan.old_cove.controllers;

import com.aidan.old_cove.models.Activity;
import com.aidan.old_cove.models.User;
import com.aidan.old_cove.repositories.ActivityRepository;
import com.aidan.old_cove.repositories.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/activity")
public class ActivityController {

    private final ActivityRepository activityRepository;

    public ActivityController(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }

    @GetMapping
    public List<Activity> getAllUsers() {
        return activityRepository.findAll();
    }
}
