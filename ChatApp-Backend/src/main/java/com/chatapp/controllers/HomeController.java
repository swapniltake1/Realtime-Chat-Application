package com.chatapp.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

	@GetMapping("/")
	public ResponseEntity<String> home(){
		return new ResponseEntity<String>("welcome to chatapp using spring boot ", HttpStatus.OK);
	}
}
