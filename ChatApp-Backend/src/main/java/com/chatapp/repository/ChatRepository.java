package com.chatapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chatapp.model.Chat;

public interface ChatRepository extends JpaRepository<Chat, Integer> {

}
