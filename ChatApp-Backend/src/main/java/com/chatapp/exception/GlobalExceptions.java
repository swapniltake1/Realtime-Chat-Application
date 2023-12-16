package com.chatapp.exception;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

@RestControllerAdvice
public class GlobalExceptions {

	@ExceptionHandler(UserException.class)
	public ResponseEntity<ErrorDetails> UserExceptionHandler(UserException e, WebRequest req) {
		
		ErrorDetails error=new ErrorDetails(e.getMessage(),req.getDescription(false), LocalDateTime.now());
		return new ResponseEntity<ErrorDetails>(error, HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(MessageException.class)
	public ResponseEntity<ErrorDetails> MessageExceptionHandler(MessageException e, WebRequest req) {
		
		ErrorDetails error=new ErrorDetails(e.getMessage(),req.getDescription(false), LocalDateTime.now());
		return new ResponseEntity<ErrorDetails>(error, HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorDetails> otherExceptionHandler(UserException e, WebRequest req) {
		
		ErrorDetails error=new ErrorDetails(e.getMessage(),req.getDescription(false), LocalDateTime.now());
		return new ResponseEntity<ErrorDetails>(error, HttpStatus.BAD_REQUEST);
	}
}
