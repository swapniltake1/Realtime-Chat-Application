package com.chatapp.service;

import java.util.List;

import com.chatapp.exception.ChatException;
import com.chatapp.exception.UserException;
import com.chatapp.model.Chat;
import com.chatapp.model.User;
import com.chatapp.request.GroupChatReq;

public interface ChatService {
	
   public Chat createChat(User reqUser, Integer userId2) throws UserException;
   
   public Chat findChatById(Integer chatId) throws ChatException;
   
   public List<Chat> findAllChatByUserId(Integer userId) throws UserException;
   
   public Chat createGroup(GroupChatReq req, User reqUserId ) throws UserException;	
   
   public Chat addUserToGroup(Integer userId, Integer chatId, User reqUser) throws UserException, ChatException;
   
   public Chat renameGroup(Integer chatId, String groupName, User reqUser) throws ChatException, UserException;
   
   public Chat removeFromGroup(Integer chatId, Integer userId, User reqUser) throws UserException, ChatException;
   
   public void deleteChat(Integer chatId, Integer userId) throws UserException, ChatException;
}
