package com.chatapp.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chatapp.exception.ChatException;
import com.chatapp.exception.UserException;
import com.chatapp.model.Chat;
import com.chatapp.model.User;
import com.chatapp.repository.ChatRepository;
import com.chatapp.request.GroupChatReq;
import com.chatapp.service.ChatService;
import com.chatapp.service.UserService;

@Service
public class ChatServiceImpl implements ChatService {

	@Autowired
	private ChatRepository chatRepository;
	@Autowired
	private UserService userService;
	
	@Override
	public Chat createChat(User reqUser, Integer userId2) throws UserException {
		
		User user2 = userService.finyById(userId2);
		
		Chat isChatExist = chatRepository.findSingleChatByUserIds(user2, reqUser);
		
		if (isChatExist!=null) {
			return isChatExist;
		}
		
		Chat chat = new Chat();
		chat.setCreatedBy(reqUser);
		chat.getUsers().add(user2);
		chat.getUsers().add(reqUser);
		chat.setGroup(false);
		chatRepository.save(chat);
		
		return chat;
		
	}

	@Override
	public Chat findChatById(Integer chatId) throws ChatException {
		Optional<Chat> chat = chatRepository.findById(chatId);
		
		if(chat.isPresent()) {
			return chat.get();
		}
		
		throw new ChatException("No User found with with id :: " +chatId);
	}

	@Override
	public List<Chat> findAllChatByUserId(Integer userId) throws UserException {
		
		User user = userService.finyById(userId);
		
		List<Chat> chats = chatRepository.findChatByUserId(user.getId());
		
		return chats;
	}

	@Override
	public Chat createGroup(GroupChatReq req, User reqUser) throws UserException {
		
		Chat group = new Chat();
		group.setGroup(true);
		group.setChatImg(req.getChatImage());
		group.setChatName(req.getChatName());
		group.setCreatedBy(reqUser);
		group.getAdmins().add(reqUser);
		// get member 1 by 1 and add it into grp
		for(Integer userId:req.getUserIds()) {
			User usersToAddGroup = userService.finyById(userId);
			group.getUsers().add(usersToAddGroup);
		}
		
		System.out.println("Senidng data into database final checkout: "+group);
		
		Chat savedChats = chatRepository.save(group);
		
		System.out.println("Data Saved to DB "+savedChats);
		return savedChats;
	}

	@Override
	public Chat addUserToGroup(Integer userId, Integer chatId, User reqUser) throws UserException, ChatException {
		Optional<Chat> group = chatRepository.findById(chatId);
		User user = userService.finyById(userId);
		
		
		
		if(group.isPresent()) {
			Chat chat = group.get();
			if (chat.getAdmins().contains(reqUser)) {
				chat.getUsers().add(user);
				return chatRepository.save(chat);
			}
           else {
			throw new UserException("U dont have access to add members in group");
		}
		}
		
         throw new ChatException("chat not found with id :: "+chatId);
	}

	@Override
	public Chat renameGroup(Integer chatId, String groupName, User reqUser) throws ChatException, UserException {
		Optional<Chat> group = chatRepository.findById(chatId);
		if(group.isPresent()) {
			Chat chat = group.get();
			if (chat.getUsers().contains(reqUser)) {
				chat.setChatName(groupName);
				chatRepository.save(chat);
			}
			throw new UserException("you are not member of this group");
		}
		
		throw new ChatException("Group not found with Group ID :: "+chatId);
	}
	

	@Override
	public Chat removeFromGroup(Integer chatId, Integer userId, User reqUser) throws UserException, ChatException {
		
		Optional<Chat> group = chatRepository.findById(chatId);
		User user = userService.finyById(userId);
		
		
		
		if(group.isPresent()) {
			Chat chat = group.get();
			if (chat.getAdmins().contains(reqUser)) {
				chat.getUsers().remove(user);
				return chatRepository.save(chat);
			}
			else if (chat.getUsers().contains(reqUser)) {
				
				if(user.getId().equals(reqUser.getId())) {
					chat.getUsers().remove(user);
					return chatRepository.save(chat);
				}
			}

			throw new UserException("u Can't remove another user");

		}
		
         throw new ChatException("chat not found with id :: "+chatId);
         
	}
	

	@Override
	public void deleteChat(Integer chatId, Integer userId) throws UserException, ChatException {
		 Optional<Chat> chat = chatRepository.findById(chatId);
		 
		 if(chat.isEmpty()) {
			 Chat chatHistory=chat.get();
			 chatRepository.deleteById(chatHistory.getId());
		 }
	}

}
