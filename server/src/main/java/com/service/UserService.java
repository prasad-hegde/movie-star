package com.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exception.UserNotFoundException;
import com.model.User;
import com.repository.UserRepository;

@Service
public class UserService {
	
	
	@Autowired
    private UserRepository userRepository;

    public User getUserById(Long id) throws UserNotFoundException {

        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            return user.get();
        } else {
            throw new UserNotFoundException("User not found");
        }
    }
    
    
    public User getUserByEmail(String email) throws UserNotFoundException {

        Optional<User> user = Optional.ofNullable(userRepository.getUserByEmail(email));
        if (user.isPresent()) {
            return user.get();
        } else {
            throw new UserNotFoundException("User not found");
        }
    }

}
