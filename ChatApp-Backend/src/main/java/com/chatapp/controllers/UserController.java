package com.chatapp.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chatapp.apiresponse.ApiResponse;
import com.chatapp.exception.UserException;
import com.chatapp.model.User;
import com.chatapp.request.UpdateUserReq;
import com.chatapp.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

	@Autowired
	private UserService userService;
	
	@GetMapping("/profile/")
	public ResponseEntity<User> getUserProfileHandler(@RequestHeader("Authorization") String token) throws UserException {
		User userByProfile = userService.findUserByProfile(token);
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
		userService.updateUser(user.getId(), updateUserReq);
		ApiResponse apiResponse = new ApiResponse("User Updated", true);
		return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.ACCEPTED);
	}
	
	
}
