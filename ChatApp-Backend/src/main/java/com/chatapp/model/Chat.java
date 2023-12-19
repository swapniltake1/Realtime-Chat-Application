package com.chatapp.model;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Chat {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	private String chatName;
	private String chatImg;
	private boolean isGroup;
	
	@ManyToMany
	private Set<User> admins= new HashSet<>();
	
	@ManyToOne            // only one user can create chat
	private User createdBy;
	
	@ManyToMany
	private Set<User> users= new HashSet<>();
	
	@OneToMany             // only one message can reply to one chat message 
	private List<Message> messages = new ArrayList<>();
	
	
}
