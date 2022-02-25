package com.booklist.Booklist.controller;

import com.booklist.Booklist.model.User;
import com.booklist.Booklist.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/authenticate")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080"})

public class HomeController  implements ErrorController {

    @Autowired
    private UserService userService;

    private static final String PATH = "/error";

    @RequestMapping(value = PATH)
    public String error() {
        return "Error handling";
    }

    public String getErrorPath() {
        return PATH;
    }

//    @GetMapping("/login")
//    public  String home()  throws IOException {
//        return "login Successful";
//    }

    @GetMapping("/login")
    public Optional<? extends GrantedAuthority> getUserName(Authentication authentication)  throws IOException {
        return authentication.getAuthorities().stream().findFirst();
    }


    @GetMapping("/admin")
    public  String admin(){
        return "This is Admin page";
    }

    @GetMapping("/getAllUsers")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

}
