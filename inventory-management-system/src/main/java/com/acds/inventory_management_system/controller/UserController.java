package com.acds.inventory_management_system.controller;

import com.acds.inventory_management_system.model.Customer;
import com.acds.inventory_management_system.model.User;
import com.acds.inventory_management_system.service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/users")
public class UserController {
    private UserService userService;
    @GetMapping("{name}")
    public ResponseEntity<String> findExistingUser(@PathVariable("name") String userName){
        User existingUser = userService.getUserByName(userName);
        if (existingUser == null) {
            return new ResponseEntity<>("User Doesn't Exists", HttpStatus.OK);
        }
        return new ResponseEntity<>("User Exists", HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody User user, HttpSession session) {
        User existingUser = userService.getUserByName(user.getName());
        if (existingUser != null && existingUser.getPassword().equals(user.getPassword())) {
            session.setAttribute("user", existingUser);
            return new ResponseEntity<>("Login successful!", HttpStatus.OK);
        }
        return new ResponseEntity<>("Invalid Username or Password!", HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/logout")
    public ResponseEntity<String> logoutUser(HttpSession session) {
        session.invalidate();
        return new ResponseEntity<>("Logged out successfully!", HttpStatus.OK);
    }
}