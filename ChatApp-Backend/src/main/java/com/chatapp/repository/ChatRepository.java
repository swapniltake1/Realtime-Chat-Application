package com.chatapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.chatapp.model.Chat;
import com.chatapp.model.User;

public interface ChatRepository extends JpaRepository<Chat, Integer> {

	@Query("select c from Chat c join c.users u where u.id =:userId")
	public List<Chat> findChatByUserId(@Param("userId") Integer userId);
	
	@Query("SELECT c FROM Chat c WHERE c.isGroup = false AND :user2 MEMBER OF c.users AND :reqUser MEMBER OF c.users")
	public Chat findSingleChatByUserIds(@Param("user2") User user2, @Param("reqUser") User reqUser);
}
