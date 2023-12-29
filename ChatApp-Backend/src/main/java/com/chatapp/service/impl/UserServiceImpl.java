package com.chatapp.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;

import com.chatapp.config.TokenProvider;
import com.chatapp.exception.UserException;
import com.chatapp.model.User;
import com.chatapp.repository.UserRepository;
import com.chatapp.request.UpdateUserReq;
import com.chatapp.service.UserService;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private TokenProvider tokenProvider;
	
	public UserServiceImpl(UserRepository userRepository, TokenProvider tokenProvider) {
		this.userRepository = userRepository;
		this.tokenProvider = tokenProvider;
	}

	@Override
	public User finyById(Integer id) throws UserException {
		Optional<User> userbyId = userRepository.findById(id);
		
		if(userbyId.isPresent()) {
			return userbyId.get();
		}
		throw new UserException("User not found with this id :: "+id);
	}

	@Override
	public User findUserByProfile(String jwt) throws UserException {
		
		String email = tokenProvider.getEmailFromToken(jwt);
		System.out.println("user email :: "+email);
		
		if(email==null) {
		throw new BadCredentialsException("Invalid token ");
		}
		User user =	userRepository.findByEmail(email);
		if(user == null) {
			throw new UserException("User not found with this email :: "+email);
		}
		System.out.println("User :: "+user);
		return user;
	}
	

	@Override
	public User updateUser(Integer id, UpdateUserReq req) throws UserException {
		User user = finyById(id);
	
		
		if(req.getFullName()!=null) {
			user.setFullName(req.getFullName());
		}
		if(req.getProfilePicture()!=null) {
			user.setProfilePicture(req.getProfilePicture());
		}
		return userRepository.save(user);
	}

	

	@Override
	public List<User> searchUser(String query) {
		List<User> searchedUsers = userRepository.searchUser(query);
		return searchedUsers;
	}

	@Override
	public List<User> searchByUserName(String name) {
		List<User> searchedUsers = userRepository.searchByUserName(name);
		return searchedUsers;
	}

	
}
