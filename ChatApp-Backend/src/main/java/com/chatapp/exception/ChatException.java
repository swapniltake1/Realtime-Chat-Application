package com.chatapp.exception;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class ChatException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public ChatException(String message) {
		super(message);
	}

}
