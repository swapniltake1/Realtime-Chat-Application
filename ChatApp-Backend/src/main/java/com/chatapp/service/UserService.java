package com.chatapp.service;

import java.util.List;

import com.chatapp.exception.UserException;
import com.chatapp.model.User;
import com.chatapp.request.UpdateUserReq;

public interface UserService {

	public User finyById(Integer id) throws UserException;
	public User findUserByProfile(String jwt) throws UserException;
	public User updateUser(Integer id, UpdateUserReq req) throws UserException;
	public List<User> searchUser(String query);
	public List<User> searchByUserName(String name);
	
}
