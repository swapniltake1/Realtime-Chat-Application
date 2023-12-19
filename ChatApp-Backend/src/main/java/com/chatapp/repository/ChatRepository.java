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
	
	// this will return where  c.is group is false and both users have present then it will return.
	@Query("select c from Chat c where c.isGroup = false and :user MEMBER OF c.users and :reqUser MEMBER OF c.users")
	public Chat findSingleChatByUserIds(@Param("user") User user, @Param("user") User reqUser);
}
