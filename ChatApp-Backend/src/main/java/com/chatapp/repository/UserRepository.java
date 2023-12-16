package com.chatapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.chatapp.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

}
