package com.booklist.Booklist.service;

import com.booklist.Booklist.Repository.UserRepository;
import com.booklist.Booklist.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Override
    public @ResponseBody
    List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserByName(String userName) {
        return userRepository.findByUsername(userName);

    }
}
