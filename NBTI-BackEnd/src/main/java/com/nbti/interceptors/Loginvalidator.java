package com.nbti.interceptors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@Component
public class Loginvalidator implements HandlerInterceptor {

	@Autowired
	private HttpSession session;

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		//브라우저가 먼저 옵션 메서드를 사용해 서버가 이 요총을 허용하는지 확인 CORS정책 기반 따라서 이건 그냥 true 해줘야함
		if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
			return true; // true를 반환하면 인터셉터를 통과합니다.
		}

		String loginID = (String) session.getAttribute("loginID");
		if (loginID != null) {
			System.out.println("아이디 있음");
			return true;
		}
		
		String uri = request.getRequestURI();
		String method = request.getHeader("method");

		response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

		return false;
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {

	}
}