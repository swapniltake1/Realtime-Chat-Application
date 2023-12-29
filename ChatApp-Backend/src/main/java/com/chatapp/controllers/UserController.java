package com.chatapp.controllers;

import java.util.HashSet;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.chatapp.apiresponse.ApiResponse;
import com.chatapp.exception.UserException;
import com.chatapp.model.User;
import com.chatapp.request.UpdateUserReq;
import com.chatapp.service.UserService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/users")
@Slf4j
public class UserController {

	@Autowired
	private UserService userService;
	
	@GetMapping("/profile")
	public ResponseEntity<User> getUserProfileHandler(@RequestHeader("Authorization") String token) throws UserException {
		System.out.println("token received :: "+token);
		User userByProfile = userService.findUserByProfile(token);
		System.out.println("User profile :: loged in "+userByProfile);
		return new ResponseEntity<User>(userByProfile, HttpStatus.ACCEPTED);
	}
	 	
	@GetMapping("/{query}")
	public ResponseEntity<List<User>> searchUserHandler(@PathVariable("query") String q) {
		List<User> searchUser = userService.searchUser(q);
		return new ResponseEntity<List<User>>(searchUser, HttpStatus.OK);
	}
	
	@PutMapping("/update")
	public ResponseEntity<ApiResponse> updateUserHandler(@RequestBody UpdateUserReq updateUserReq, @RequestHeader("Authorization") String token) throws UserException {
		User user = userService.findUserByProfile(token);
	//	log.info("updating user profile"+user.getFullName());
		userService.updateUser(user.getId(), updateUserReq);
		ApiResponse apiResponse = new ApiResponse("User Updated", true);
		return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.ACCEPTED);
	}
	
	@GetMapping("/search")
	public ResponseEntity<HashSet<User>> searchByNameHandler(@RequestParam("name") String name) {
		List<User> searchUser = userService.searchByUserName(name);
		HashSet<User> setUsr = new HashSet<>(searchUser);
		
		return new ResponseEntity<HashSet<User>>(setUsr, HttpStatus.OK);
	}
	
	
}
