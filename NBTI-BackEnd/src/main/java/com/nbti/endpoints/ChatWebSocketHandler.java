package com.nbti.endpoints;

import java.lang.reflect.Type;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.google.gson.JsonSyntaxException;
import com.google.gson.reflect.TypeToken;
import com.nbti.dto.ChatDTO;
import com.nbti.dto.ChatFileDTO;
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
		Object attribute=httpSession.getAttribute("group_seq");
		int group_seq=0;
		if(attribute!=null) {
			group_seq=(int)httpSession.getAttribute("group_seq");	
		}
		String sender =(String) httpSession.getAttribute("loginID");	
		List<Group_memberDTO> list=memberService.members(group_seq);
		boolean jsonValidate =validateJson(message.getPayload());
		
		if(message.getPayload().equals("updateMember")) {
			broadcastMessage("updateMember",list);
		}
		else if(message.getPayload().equals("chatController")) {
			broadcastMessage("chatController",list);
		}
		else if(!jsonValidate){
			boolean listCheck=false;
			for (Group_memberDTO dto : list) { //만약 방나갓는데 채팅 보낼라고하면 막기
				if(dto.getMember_id().equals(sender)) {
					listCheck=true;
					break;
				}
			}
			if(listCheck) {
				ChatDTO dto = new ChatDTO(0, sender, message.getPayload(), null, group_seq,0);
				dto = chatService.insert(dto);
				String json = gson.toJson(dto);
				broadcastMessage(json,list);
				System.out.println(list.get(1).getMember_id());
				System.out.println("메세지보냄");
			}	
		}
		else {
			System.out.println("파일업로드 웹소켓");
			String jsonString=message.getPayload();
			Type mapType = new TypeToken<Map<String, Object>>() {}.getType();
			Map<String, Object> map = gson.fromJson(jsonString, mapType);
			String fileMessage=map.get("oriname")+"*"+map.get("sysname")+"*"+map.get("code");
			ChatDTO dto = null;
			if (map.get("dto") != null) {
			    // dto 필드 자체가 LinkedTreeMap으로 변환되어 있으므로, 이를 다시 JSON 문자열로 변환한 후, ChatDTO로 변환
			    String dtoJson = gson.toJson(map.get("dto"));
			    dto = gson.fromJson(dtoJson, ChatDTO.class);
			}
			String json = gson.toJson(dto);
			broadcastMessage(json,list);
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

	private void broadcastMessage(String message,List<Group_memberDTO> list) {// 그룹별 메세지 전송 로직
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
	
	private boolean validateJson(String jsonString ) {
		 try {
	            // JSON 문자열을 JsonElement로 파싱하여 유효성 검사
	            JsonElement jsonElement = JsonParser.parseString(jsonString);
	            
	            // JSON 파싱 성공    
	            return true;
	        } catch (JsonSyntaxException e) {
	            // JSON 파싱 중 오류 발생 (유효하지 않은 JSON)
	        	return false;
	           
	        } catch (Exception e) {
	            // 기타 예외 처리
	        	return false;
	        }
	}
}

