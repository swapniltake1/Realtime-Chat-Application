package com.chatapp.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chatapp.exception.ChatException;
import com.chatapp.exception.MessageException;
import com.chatapp.exception.UserException;
import com.chatapp.model.Chat;
import com.chatapp.model.Message;
import com.chatapp.model.User;
import com.chatapp.repository.MessageRepository;
import com.chatapp.request.SendMessageReq;
import com.chatapp.service.ChatService;
import com.chatapp.service.MessageService;
import com.chatapp.service.UserService;

@Service
public class MessageServiceImpl implements MessageService {

	@Autowired
	private MessageRepository messageRepository;
	@Autowired
	private UserService userService;
	@Autowired
	private ChatService chatService;
	
	@Override
	public Message sentMessage(SendMessageReq req) throws UserException, ChatException {
		
		User user = userService.finyById(req.getUserId());
		Chat chat = chatService.findChatById(req.getChatId());
		
		Message message = new Message();
		message.setChat(chat);
		message.setUser(user);
		message.setContent(req.getContent());
		message.setTimestamp(LocalDateTime.now());
		Message message2 = messageRepository.save(message); 
		return message2;
	}

	@Override
	public List<Message> getChatsMessages(Integer chatId, User reqUser) throws ChatException, UserException {
		Chat chat = chatService.findChatById(chatId);
		
		if(!chat.getUsers().contains(reqUser)) {
			throw new UserException("U Cant get this message, U are not related to this chat. :: "+chat.getId());
		}
		
		List<Message> messages = messageRepository.findByChatId(chat.getId());
		
		return messages;
	}

	@Override
	public Message findMessageById(Integer messageId) throws MessageException {
		Optional<Message> opt = messageRepository.findById(messageId);
		
		if(opt.isPresent()) {
			return opt.get();
		}
		 throw new MessageException(" Message not found with Id :: "+messageId);
	}

	@Override
	public void deleteMessage(Integer messageId, User reqUser) throws MessageException , UserException{
       Message message = findMessageById(messageId);
       
       if(message.getUser().getId().equals(reqUser.getId())) {
    	   messageRepository.deleteById(messageId);
       }
       throw new UserException("you cant delete another users message  :: "+reqUser.getFullName());
	}

}
