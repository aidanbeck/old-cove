package com.aidan.old_cove.models;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private String password; //PLACEHOLDER - NEED TO ENCRYPT!!!
    private int logInCount;
    // timeCreated
    // timeLastLogIn

    // Save Data
    // Exists here for MVP- but will have its own table if expanded.
    private String position;
    @ElementCollection private List<String> signals;
    @ElementCollection private List<String> inventoryItems;
    @ElementCollection private List<String> locations;

    public User() {}; // needed?

    public User(String name, String password) {
        this.name = name;
        this.password = password;
        this.logInCount = 0;
        this.position = "";
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getLogInCount() {
        return logInCount;
    }

    public void setLogInCount(int logInCount) {
        this.logInCount = logInCount;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public List<String> getSignals() {
        return signals;
    }

    public void setSignals(List<String> signals) {
        this.signals = signals;
    }

    public List<String> getInventoryItems() {
        return inventoryItems;
    }

    public void setInventoryItems(List<String> inventoryItems) {
        this.inventoryItems = inventoryItems;
    }

    public List<String> getLocations() {
        return locations;
    }

    public void setLocations(List<String> locations) {
        this.locations = locations;
    }
}