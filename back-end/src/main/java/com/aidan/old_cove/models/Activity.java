package com.aidan.old_cove.models;

import jakarta.persistence.*;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    private int logInCount;
    private int moveCount;

    private LocalDateTime dateCreated;
    private LocalDateTime lastLogIn;

    @ElementCollection private List<String> moves; // history of moves taken

    public Activity() {
        this.dateCreated = LocalDateTime.now();
        this.lastLogIn = LocalDateTime.now();
        this.logInCount = 0;
        this.moveCount = 0;
    }

    public Activity(User user) {
        this.user = user;
        this.dateCreated = LocalDateTime.now();
        this.lastLogIn = LocalDateTime.now();
        this.logInCount = 0;
        this.moveCount = 0;
    }

    public int getId() { return id; }

    public void setId(int id) { this.id = id; }

    public int getLogInCount() { return logInCount; }

    public void setLogInCount(int logInCount) { this.logInCount = logInCount; }

    public int getMoveCount() { return moveCount; }

    public void setMoveCount(int moveCount) { this.moveCount = moveCount; }

    public LocalDateTime getDateCreated() { return dateCreated; }

    public void setDateCreated(LocalDateTime dateCreated) { this.dateCreated = dateCreated; }

    public LocalDateTime getLastLogIn() { return lastLogIn; }

    public void setLastLogIn(LocalDateTime lastLogIn) { this.lastLogIn = lastLogIn; }

    public User getUser() { return user; }

    public void setUser(User user) { this.user = user; }


    public void logIn() {
        logInCount++;
        lastLogIn = LocalDateTime.now();
    }

    public void addMove(String move) {
        moveCount++;
        moves.add(move);
    }
}