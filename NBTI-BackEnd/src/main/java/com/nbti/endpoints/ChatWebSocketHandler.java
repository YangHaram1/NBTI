package com.nbti.endpoints;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.google.gson.Gson;
import com.nbti.dto.ChatDTO;
import com.nbti.dto.Group_memberDTO;
import com.nbti.services.ChatService;
import com.nbti.services.Group_memberService;

import jakarta.servlet.http.HttpSession;

@Component
public class ChatWebSocketHandler extends TextWebSocketHandler {

	private final Set<WebSocketSession> clients = Collections.synchronizedSet(new HashSet<>());
	private final Gson gson = new Gson();

	@Autowired
	private ChatService chatService;
	@Autowired
	private Group_memberService memberService;

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		clients.add(session);
		System.out.println("웹소켓 연결");
		
		HttpSession httpSession = (HttpSession) session.getAttributes().get("HTTPSESSIONID");																				// 수정
		String sender = (String) httpSession.getAttribute("loginID");
		System.out.println(sender);
	}

	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		HttpSession httpSession = (HttpSession) session.getAttributes().get("HTTPSESSIONID"); 
		int group_seq=(int)httpSession.getAttribute("group_seq");		
		String sender =(String) httpSession.getAttribute("loginID");
		ChatDTO dto = new ChatDTO(0, sender, message.getPayload(), null, group_seq);
		List<Group_memberDTO> list=memberService.members(group_seq);
		if(message.getPayload().equals("updateMember")) {
			broadcastMessage("updateMember",list);
		}
		else {																		
			dto = chatService.insert(dto);
			String json = gson.toJson(dto);
			broadcastMessage(json,list);
			System.out.println(list.get(1).getMember_id());
			System.out.println("메세지보냄");
		}
	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		clients.remove(session);
	}

	@Override
	public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
		 try {
			 clients.remove(session);
		    } catch (Exception e) {
		        // 예외 처리	      
		    	exception.printStackTrace();
		    }
		
		
	}

	private void broadcastMessage(String message,List<Group_memberDTO> list) {
		synchronized (clients) {
			for (WebSocketSession client : clients) {
				try {
					String member_id=(String)((HttpSession)client.getAttributes().get("HTTPSESSIONID")).getAttribute("loginID");
					for(Group_memberDTO dto : list) {
						if(dto.getMember_id().equals(member_id)) {
							client.sendMessage(new TextMessage(message));
							break;
						}
					}
					
				} catch (Exception e) {
					System.out.println("Error sending message: " + e.getMessage());
				}
			}
		}
	}
}

