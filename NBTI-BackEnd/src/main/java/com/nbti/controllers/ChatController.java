package com.nbti.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nbti.dto.ChatDTO;
import com.nbti.dto.Group_memberDTO;
import com.nbti.services.ChatService;
import com.nbti.services.Group_memberService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/chat")
public class ChatController {

	@Autowired
	private ChatService cserv;
	// @RequestParamm(required=true)
	@Autowired
	private HttpSession session;

	@Autowired
	private Group_memberService mserv;

	@PostMapping
	public ResponseEntity<Void> post(@RequestBody ChatDTO dto) {

		return ResponseEntity.ok().build(); // 200
	}

	@GetMapping
	public ResponseEntity<List<ChatDTO>> get(String search, @RequestParam(defaultValue = "0") int chatSeq)
			throws Exception {
		List<ChatDTO> list = new ArrayList<>();
		System.out.println(chatSeq);
		if (search != null) {
			list = cserv.searchList(search, chatSeq);
		} else if (chatSeq != 0) {
			list = cserv.getList(chatSeq);
		} else {

		}
		session.setAttribute("group_seq", chatSeq);
		return ResponseEntity.ok(list);
	}

	@GetMapping("/unread")
	public ResponseEntity<Integer> getUnreadTotal() throws Exception{
		System.out.println("unread");
		int result=0;
		List<Group_memberDTO> mlist= new ArrayList<>();
		String loginID= (String) session.getAttribute("loginID");
		mlist=mserv.list(loginID);
		for (Group_memberDTO dto : mlist) {
			int temp=cserv.unreadTotl(dto.getGroup_seq(), loginID);
			if(temp!=0) temp--;
			result+=temp;
		}
		return ResponseEntity.ok(result);
	}

	@DeleteMapping()
	public void delete() throws Exception {

	}

	@ExceptionHandler(Exception.class)
	public String exceptionHandler(Exception e) {
		e.printStackTrace();
		return "error";
	}
}