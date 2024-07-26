package com.nbti.interceptors;

import java.util.Map;

import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import jakarta.servlet.http.HttpSession;

public class WebHandshakeInterceptor implements HandshakeInterceptor {
	@Override
	public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler,
			Map<String, Object> attributes) throws Exception {

		if (request instanceof ServletServerHttpRequest) {
			ServletServerHttpRequest servletRequest = (ServletServerHttpRequest) request;
			HttpSession session = servletRequest.getServletRequest().getSession(true);

			if (session != null) {
				attributes.put("HTTPSESSIONID", session);
				System.out.println("세션 인터셉터 성공");
				System.out.println(session.getAttribute("loginID"));
			} else {
				System.out.println("세션이 null입니다.");
			}
		}

		return true;
	}

	@Override
	public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler,
			Exception ex) {
	}
}
