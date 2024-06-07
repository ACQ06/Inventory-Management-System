package com.acds.inventory_management_system.service.impl;

import com.acds.inventory_management_system.model.User;
import com.acds.inventory_management_system.repository.UserRepository;
import com.acds.inventory_management_system.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;

    @Override
    public User createUser(User user){
        return userRepository.save(user);
    }

    @Override
    public User getUserById(Long userId){
        Optional<User> optionalUser = userRepository.findById(userId);
        return optionalUser.get();
    }

    @Override
    public User getUserByName(String name){
        Optional<User> optionalUser = userRepository.findByName(name);
        return optionalUser.get();
    }

    @Override
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    @Override
    public User updateUser(User user){
        User existingUser = userRepository.findById(user.getId()).get();
        existingUser.setName(user.getName());
        existingUser.setPassword(user.getPassword());

        User updatedUser = userRepository.save(existingUser);
        return updatedUser;
    }

    @Override
    public void deleteUser(long userId) {
        userRepository.deleteById(userId);
    }
}
