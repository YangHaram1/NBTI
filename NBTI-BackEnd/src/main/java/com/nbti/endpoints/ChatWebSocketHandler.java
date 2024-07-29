package com.nbti.endpoints;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.google.gson.Gson;
import com.nbti.dto.ChatDTO;
import com.nbti.services.ChatService;

import jakarta.servlet.http.HttpSession;

@Component
public class ChatWebSocketHandler extends TextWebSocketHandler {

	private final Set<WebSocketSession> clients = Collections.synchronizedSet(new HashSet<>());
	private final Gson gson = new Gson();

	@Autowired
	private ChatService chatService;

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
		dto = chatService.insert(dto);
		String json = gson.toJson(dto);
		broadcastMessage(json);
		System.out.println("메세지보냄");
	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {	
		HttpSession httpSession = (HttpSession) session.getAttributes().get("HTTPSESSIONID"); 
		synchronized (httpSession) {
	        if (httpSession != null && httpSession.getAttribute("group_seq") != null) {
	            httpSession.removeAttribute("group_seq");
	        }
	    }
		clients.remove(session);
	}

	@Override
	public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
		clients.remove(session);
		exception.printStackTrace();
	}

	private void broadcastMessage(String message) {
		synchronized (clients) {
			for (WebSocketSession client : clients) {
				try {
					client.sendMessage(new TextMessage(message));
				} catch (Exception e) {
					System.out.println("Error sending message: " + e.getMessage());
				}
			}
		}
	}
}

