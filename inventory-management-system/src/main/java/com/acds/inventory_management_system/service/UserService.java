package com.acds.inventory_management_system.service;

import com.acds.inventory_management_system.model.User;

import java.util.List;

public interface UserService {
    User createUser(User user);
    User getUserById(Long userId);
    User getUserByName(String name);
    List<User> getAllUsers();
    User updateUser(User user);
    void deleteUser(long userId);
}
