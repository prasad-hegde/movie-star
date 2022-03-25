package com.controller;

import java.util.List;
import java.util.Random;

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

import com.model.PasswordReset;
import com.model.User;
import com.model.VerifyCode;
import com.repository.UserRepository;
import com.repository.VerificationCodeRepository;
import com.service.EmailService;
import com.service.Status;
import com.service.UserService;
import com.utils.MD5Utils;


@RestController
public class UserController {
	
	@Autowired
    UserRepository userRepository;
	
	@Autowired
	VerificationCodeRepository verificationCodeRepository;
	
	@Autowired
    EmailService emailService;
	
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
        newUser.setPassword(MD5Utils.inputPassToFormPass(newUser.getPassword()));
//        newUser.setPassword(newUser.getPassword());
        userRepository.save(newUser);
//        return Status.SUCCESS;
        return ResponseEntity.ok("Success!");
	}
	
	@PostMapping("/users/login")
    @CrossOrigin
    public ResponseEntity loginUser(@Valid @RequestBody User user) {
        List<User> users = userRepository.findAll();
        String passwordU = MD5Utils.inputPassToFormPass(user.getPassword());// encrypt the password to compare
//        String passwordU = user.getPassword();
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
	
	@PostMapping("/users/password")
	@CrossOrigin
	    // if users want to reset the password, they need to enter their email at first.
	    // Then, user will receive one mail with verification code.
    public Status resetMailRequest(@Valid @RequestBody User user) {// we only need email of this user
        List<User> users = userRepository.findAll();
        List<VerifyCode> verify= verificationCodeRepository.findAll();
        for (User other : users) {
            if (other.getEmail().equals(user.getEmail())) {
                String emailAccount = other.getEmail();
                String code = codeGenerate();
                int checkExist = 0;
                for(VerifyCode v: verify){// check whether this user has already receive an email
                    if(v.getEmail().equals(emailAccount)){
                        checkExist = 1;
                    }
                }
                // if not, create a verification code in the repository, and send the code into user's mailbox
                if(checkExist == 0){
                    VerifyCode v = new VerifyCode();
                    v.setEmail(emailAccount);
                    v.setCode(code);
                    
                    verificationCodeRepository.save(v);
                    emailService.sendSimpleMail(emailAccount,code);
                    return Status.SUCCESS;
                }
                return Status.FAILURE;
            }
        }

        return Status.FAILURE;
	}

	
    @PostMapping("/users/passwordReset")
    @CrossOrigin
    //After user has receive a mail with verification code, then they need to enter their email, code, and new password
    //If one of the email or code is incorrect, the password will not be reset.
    //Else, reset the password.
    public Status passwordReset(@Valid @RequestBody PasswordReset passwordReset) {
        List<User> users = userRepository.findAll();
        List<VerifyCode> verifyCodes = verificationCodeRepository.findAll();
        for(VerifyCode v: verifyCodes) {
            Long id;
            if(v.getEmail().equals(passwordReset.getEmail()) && v.getCode().equals(passwordReset.getCodeSent())) {
                id = v.getId();
                for (User other : users) {
                    if(other.getEmail().equals(passwordReset.getEmail())) {
                        other.setPassword(MD5Utils.inputPassToFormPass(passwordReset.getPassword()));
                        userRepository.save(other);
                        verificationCodeRepository.deleteById(id);
                        return Status.Password_Reset_Successfully;
                    }
                }
            }
        }
        return Status.FAILURE;
    }
	 
	 public String codeGenerate() {
        List<VerifyCode> verify = verificationCodeRepository.findAll();
        int code = 0;
        int check = 1;
        // Randomly generate the verification code, and then check whether the code has already existed in the repo.
        while (check == 1) {
            for (int i = 0; i < 6; i++) {
                Random rd = new Random();
                int n;
                if (i == 5) {
                    n = rd.nextInt(9) + 1;
                } else {
                    n = rd.nextInt(10);
                }
                code += (n * (int) Math.pow(10, i));
            }
            int stop = 0;
            for(VerifyCode v : verify){
                if(v.getCode().equals(code+"")){
                    stop = 1;
                }
            }
            if(stop == 0){
                check = 0;
            }
        }

        return code+"";
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
