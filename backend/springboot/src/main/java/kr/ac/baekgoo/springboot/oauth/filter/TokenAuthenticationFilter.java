package kr.ac.baekgoo.springboot.oauth.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import kr.ac.baekgoo.springboot.oauth.token.AuthToken;
import kr.ac.baekgoo.springboot.oauth.token.AuthTokenProvider;
import kr.ac.baekgoo.springboot.utils.HeaderUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Log4j2
@RequiredArgsConstructor
public class TokenAuthenticationFilter extends OncePerRequestFilter {
    private final AuthTokenProvider tokenProvider;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        try {
            String tokenStr = HeaderUtil.getAccessToken(request);
            log.debug("Attempting to authenticate with token: {}", tokenStr);

            AuthToken token = tokenProvider.convertAuthToken(tokenStr);

            if (token.validate()) {
                log.debug("Token is valid. Attempting to authenticate the user.");
                Authentication authentication = tokenProvider.getAuthentication(token);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }

            filterChain.doFilter(request, response);
        } catch (IOException e) {
            log.error("IOException occurred during authentication process: {}", e.getMessage(), e);
            throw e;
        } catch (Exception e) {
            log.error("Exception occurred during authentication process: {}", e.getMessage(), e);
            if (e instanceof ServletException) {
                throw (ServletException) e;
            } else {
                throw new ServletException(e);
            }
        }
    }
}
