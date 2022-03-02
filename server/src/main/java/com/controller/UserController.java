package com.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.model.User;
import com.repository.UserRepository;
import com.service.Status;
import com.service.UserService;


@RestController
public class UserController {
	
	@Autowired
    UserRepository userRepository;
	
	@Autowired
    UserService userService;
	
	@PostMapping("/users/register")
    @CrossOrigin
    public ResponseEntity registerUser(@Valid @RequestBody User newUser) {
        List<User> users = userRepository.findAll();
        
        for (User user : users) {      
            if (user.getEmail().equalsIgnoreCase(newUser.getEmail())) {
                System.out.println("User Already exists!");
//                return Status.USER_ALREADY_EXISTS;
              return ResponseEntity.ok("User Already Exists");
            }
        }
//        newUser.setPassword(MD5Utils.inputPassToFormPass(newUser.getPassword()));
        newUser.setPassword(newUser.getPassword());
        userRepository.save(newUser);
//        return Status.SUCCESS;
        return ResponseEntity.ok("Success!");
	}
	
	@PostMapping("/users/login")
    @CrossOrigin
    public ResponseEntity loginUser(@Valid @RequestBody User user) {
        List<User> users = userRepository.findAll();
//        String passwordU = MD5Utils.inputPassToFormPass(user.getPassword());// encrypt the password to compare
        String passwordU = user.getPassword();
        for (User other : users) {
            if (other.getEmail().equals(user.getEmail())) {
                if(other.getPassword().equals(passwordU)) {
                    other.setLoggedIn(true);
                    userRepository.save(other);
//                    return Status.USER_LOGGED_IN;
                    return ResponseEntity.ok("User logged in successfully!");
                }
            }
        }
//        return Status.FAILURE;
        return ResponseEntity.ok("Please check your credentials");
	}
	
	@PostMapping("/users/logout")
    @CrossOrigin
    public ResponseEntity logUserOut(@Valid @RequestBody User user) {
        List<User> users = userRepository.findAll();

        for (User other : users) {
            if (other.equals(user)) {
                user.setLoggedIn(false);
                userRepository.save(user);
                return ResponseEntity.ok("Logout successful!");
//                return Status.SUCCESS;
            }
        }
        return ResponseEntity.ok("Logout unsuccessful!");
//        return Status.FAILURE;
    }
	
	
	 //get users by email ID
	 @GetMapping(value = "/users/{email}")
	    public ResponseEntity<User> getUserByEmail(@PathVariable("email") String email) {
	        return ResponseEntity.ok(userService.getUserByEmail(email));
	 }
	

    @GetMapping("/test")
	public ResponseEntity<String> testGetendPoint(){
		
		return ResponseEntity.ok("Test endpoint working");
	}
    
    @DeleteMapping("/users/all")
    @CrossOrigin
    public Status deleteUsers() {
        userRepository.deleteAll();
        return Status.SUCCESS;
    }
}
