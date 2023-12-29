package com.chatapp.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.chatapp.apiresponse.ApiResponse;
import com.chatapp.exception.ChatException;
import com.chatapp.exception.UserException;
import com.chatapp.model.Chat;
import com.chatapp.model.User;
import com.chatapp.request.GroupChatReq;
import com.chatapp.request.SingleChatReq;
import com.chatapp.service.ChatService;
import com.chatapp.service.UserService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/chats")
@Slf4j
public class ChatController {

	@Autowired
	private UserService userService;
	
	@Autowired
	private ChatService chatService;
	
	@PostMapping("/single")
	public ResponseEntity<Chat> createChatHandler(@RequestBody SingleChatReq singleChatReq, @RequestHeader("Authorization") String jwt) throws UserException {
		User reqUser = userService.findUserByProfile(jwt);
		Chat chat = chatService.createChat(reqUser, singleChatReq.getUserId());
		
		return  new ResponseEntity<Chat>(chat, HttpStatus.OK);
	}
	
	@PostMapping("/group")
	public ResponseEntity<Chat> createGroupHandler(@RequestBody GroupChatReq groupChatReq, @RequestHeader("Authorization") String jwt) throws UserException {
		log.info("Req Received for create grp");
		
		System.out.println("Req Received for create grp"+ groupChatReq);
		User reqUser = userService.findUserByProfile(jwt);
		
		Chat chat = chatService.createGroup(groupChatReq, reqUser);
		
		return  new ResponseEntity<Chat>(chat, HttpStatus.OK);
	}
	
	@GetMapping("/{chatId}")
	public ResponseEntity<Chat> findChatByIdHandler(@PathVariable Integer chatId, @RequestHeader("Authorization") String jwt) throws UserException, ChatException {
	
		Chat chat = chatService.findChatById(chatId);
		
		return  new ResponseEntity<Chat>(chat, HttpStatus.OK);
	}
	
	@GetMapping("/user")
	public ResponseEntity<List<Chat>> findAllChatsByUserIdHandler(@RequestHeader("Authorization") String jwt) throws UserException {
		User reqUser = userService.findUserByProfile(jwt);
		List<Chat> chat = chatService.findAllChatByUserId(reqUser.getId());
		
		return  new ResponseEntity<List<Chat>>(chat, HttpStatus.OK);
	}
	
	
	@PutMapping("/{chatId}/add/{userId}")
	public ResponseEntity<Chat> addUserToGroupHandler(@PathVariable Integer chatId, @PathVariable Integer UserId, @RequestHeader("Authorization") String jwt) throws UserException, ChatException {
		User reqUser = userService.findUserByProfile(jwt);
		Chat chat = chatService.addUserToGroup(UserId, chatId, reqUser);
	
		return  new ResponseEntity<Chat>(chat, HttpStatus.OK);
	}
	
	@PutMapping("/{chatId}/remove/{userId}")
	public ResponseEntity<Chat> removeUserFromGroupHandler(@PathVariable Integer chatId, @PathVariable Integer UserId, @RequestHeader("Authorization") String jwt) throws UserException, ChatException {
		User reqUser = userService.findUserByProfile(jwt);
		Chat chat = chatService.removeFromGroup(chatId, UserId, reqUser);
	
		return  new ResponseEntity<Chat>(chat, HttpStatus.OK);
	}
	
	@DeleteMapping("/delete/{chatId}")
	public ResponseEntity<ApiResponse> deleteChatHandler(@PathVariable Integer chatId, @RequestHeader("Authorization") String jwt) throws UserException, ChatException {
		User reqUser = userService.findUserByProfile(jwt);
		 chatService.deleteChat(chatId, reqUser.getId());
		 
		 ApiResponse apiResponse = new ApiResponse("Chat Deleted Succesfully", true);
	
		return  new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.OK);
	}
}
