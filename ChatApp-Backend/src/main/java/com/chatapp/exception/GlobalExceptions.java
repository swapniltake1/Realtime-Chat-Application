package com.chatapp.exception;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.NoHandlerFoundException;

@RestControllerAdvice
public class GlobalExceptions {

	@ExceptionHandler(UserException.class)
	public ResponseEntity<ErrorDetails> UserExceptionHandler(UserException e1, WebRequest req) {
		
		ErrorDetails error=new ErrorDetails(e1.getMessage(),req.getDescription(false), LocalDateTime.now());
		return new ResponseEntity<ErrorDetails>(error, HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(MessageException.class)
	public ResponseEntity<ErrorDetails> MessageExceptionHandler(MessageException e2, WebRequest req) {
		
		ErrorDetails error=new ErrorDetails(e2.getMessage(),e2.getMessage(), LocalDateTime.now());
		return new ResponseEntity<ErrorDetails>(error, HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(ChatException.class)
	public ResponseEntity<ErrorDetails> ChatExceptionHandler(ChatException e6, WebRequest req) {
		
		ErrorDetails error=new ErrorDetails(e6.getMessage(),e6.getMessage(), LocalDateTime.now());
		return new ResponseEntity<ErrorDetails>(error, HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ErrorDetails> MethodArgumentsNotValidExceptionHandler(MethodArgumentNotValidException e3, WebRequest req) {
		String err = e3.getBindingResult().getFieldError().getDefaultMessage();
		ErrorDetails error=new ErrorDetails("Validation error, check your method args",err, LocalDateTime.now());
		return new ResponseEntity<ErrorDetails>(error, HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(NoHandlerFoundException.class)
	public ResponseEntity<ErrorDetails> NoHandlerFoundExceptionHandler(NoHandlerFoundException e4, WebRequest req) {
		
		ErrorDetails error=new ErrorDetails("No handler avalble for this endpoint",e4.getMessage(), LocalDateTime.now());
		return new ResponseEntity<ErrorDetails>(error, HttpStatus.BAD_REQUEST);
	}
	
	
	
	@ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorDetails> otherExceptionHandler(Exception e5, WebRequest req) {
		
		ErrorDetails error=new ErrorDetails(e5.getMessage(),req.getDescription(false), LocalDateTime.now());
		return new ResponseEntity<ErrorDetails>(error, HttpStatus.BAD_REQUEST);
	}
}
