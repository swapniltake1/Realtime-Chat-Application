package com.chatapp.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class AuthResponse {

	private String jwt;
	private boolean isAuth;
}
