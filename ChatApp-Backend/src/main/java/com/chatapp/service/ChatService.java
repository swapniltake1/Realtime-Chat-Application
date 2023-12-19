package com.chatapp.service;

import java.util.List;

import com.chatapp.exception.ChatException;
import com.chatapp.exception.UserException;
import com.chatapp.model.Chat;

public interface ChatService {
	
   public Chat createChat(Integer reqUser, Integer userId2) throws UserException;
   
   public Chat findChatById(Integer chatId) throws ChatException;
   
   public List<Chat> findAllChatByUserId(Integer userId) throws UserException;
   
   public Chat createGroup(GroupChatReq req, Integer reqUserId) throws UserException;	
   
   public Chat addUserToGroup(Integer userId, Integer chatId) throws UserException, ChatException;
   
   public Chat renameGroup(Integer chatId, String groupName, Integer reqUserId) throws ChatException;
   
   public Chat removeFromGroup(Integer chatId, Integer userId, Integer reqUser) throws UserException, ChatException;
   
   public Chat deleteChat(Integer chatId, Integer userId) throws UserException, ChatException;
}
