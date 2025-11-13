package com.aidan.old_cove.repositories;

import com.aidan.old_cove.models.Activity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivityRepository extends JpaRepository<Activity, Integer> {
}