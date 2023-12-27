package com.chatapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.chatapp.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

	
	public User findByEmail(String email);
	
	@Query("SELECT u FROM User u WHERE u.fullName LIKE %:query% OR u.email LIKE %:query%")
	public List<User> searchUser(@Param("query") String query);
	
	@Query("SELECT u FROM User u WHERE u.fullName LIKE %:name%")
	public List<User> searchByUserName(@Param("name") String name);


}
