package com.nbti.config;

import java.io.IOException;

import org.springframework.stereotype.Component;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.FilterConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class SameSiteCookieFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // 필터 초기화
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        // 원래의 필터 체인 계속 실행
        chain.doFilter(request, response);

        // 쿠키에 SameSite=None 속성 추가
        String setCookieHeader = httpResponse.getHeader("Set-Cookie");
        if (setCookieHeader != null && !setCookieHeader.contains("SameSite=None")) {
            httpResponse.setHeader("Set-Cookie", setCookieHeader + "; SameSite=None; Secure");
        }
    }

    @Override
    public void destroy() {
        // 필터 종료
    }
}
