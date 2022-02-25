package com.booklist.Booklist.service;

import com.booklist.Booklist.Repository.UserRepository;
import com.booklist.Booklist.model.Book;
import com.booklist.Booklist.model.User;

import java.util.List;

public interface UserService{

    public List<User> getAllUsers();

    public User getUserByName(String userName);
}
