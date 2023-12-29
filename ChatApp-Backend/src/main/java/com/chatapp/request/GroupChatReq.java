package com.chatapp.request;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GroupChatReq {

	private List<Integer> userIds;
	private String chatName;
	private String chatImage;
}
