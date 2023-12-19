package com.chatapp.apiresponse;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class ApiResponse {

	private  String message;
	private boolean status;
	
}
