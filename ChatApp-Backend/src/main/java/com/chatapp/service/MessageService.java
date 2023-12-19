package com.chatapp.service;

import java.util.List;

import com.chatapp.exception.ChatException;
import com.chatapp.exception.MessageException;
import com.chatapp.exception.UserException;
import com.chatapp.model.Message;
import com.chatapp.model.User;
import com.chatapp.request.SendMessageReq;

public interface MessageService {

	public Message sentMessage(SendMessageReq req) throws UserException, ChatException;
	
	public List<Message> getChatsMessages(Integer chatId, User reqUser) throws ChatException, UserException;
	
	public Message findMessageById(Integer messageId) throws MessageException;
	
	public void deleteMessage(Integer messageId, User reqUser)throws MessageException, UserException;
	
}
