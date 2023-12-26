package com.chatapp.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chatapp.config.TokenProvider;
import com.chatapp.exception.UserException;
import com.chatapp.model.User;
import com.chatapp.repository.UserRepository;
import com.chatapp.request.Loginreq;
import com.chatapp.response.AuthResponse;
import com.chatapp.service.CustomUserService;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private TokenProvider tokenProvider;
	
	@Autowired
	private CustomUserService customUserService;
	
	@PostMapping("/signup")
	public ResponseEntity<AuthResponse> createUserHandler(@RequestBody User user) throws UserException {
		String email = user.getEmail();
		String password = user.getPassword();
		String fullName = user.getFullName();
		
		User isUser=userRepository.findByEmail(email);
		if(isUser!=null) {
			throw new UserException("Accounnt already exist with email :: "+email);
		}
		
		User createUser = new User();
		createUser.setEmail(email);
		createUser.setPassword(passwordEncoder.encode(password));
		createUser.setFullName(fullName);
		
		userRepository.save(createUser);
		
		Authentication authentication = new UsernamePasswordAuthenticationToken(email, password);
		
		SecurityContextHolder.getContext().setAuthentication(authentication);
		
		String jwt = tokenProvider.generateToken(authentication);
		
		AuthResponse res = new AuthResponse(jwt, true);
		
		return new ResponseEntity<AuthResponse>(res, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/signin")
	public ResponseEntity<AuthResponse> loginHandler(@RequestBody Loginreq req) {
		String email = req.getEmail();
		String password = req.getPassword();
		
		// cheking username and password .
		Authentication authentication = authenticateReq(email, password);
		
		SecurityContextHolder.getContext().setAuthentication(authentication);
		
        String jwt = tokenProvider.generateToken(authentication);
		
		AuthResponse res = new AuthResponse(jwt, true);
		
		return new ResponseEntity<AuthResponse>(res, HttpStatus.ACCEPTED);
		
		
	}
	
	public Authentication authenticateReq(String username, String Password) {
		
		UserDetails userDetails = customUserService.loadUserByUsername(username);
		
		if(userDetails==null) {
			throw new BadCredentialsException("Invalid username or password");
		}
		
		if(!passwordEncoder.matches(Password, userDetails.getPassword())) {
			throw new BadCredentialsException("Invalid Password or username");
		}
		
		return new UsernamePasswordAuthenticationToken(userDetails,null,  userDetails.getAuthorities());
		
	}
}
