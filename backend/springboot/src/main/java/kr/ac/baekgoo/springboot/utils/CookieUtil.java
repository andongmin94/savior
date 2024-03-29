package kr.ac.baekgoo.springboot.utils;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;
import org.springframework.util.SerializationUtils;

import java.util.Base64;
import java.util.Optional;

@Log4j2
public class CookieUtil {

    public static Optional<Cookie> getCookie(HttpServletRequest request, String name) {
        log.trace("Attempting to get cookie: {}", name);
        Cookie[] cookies = request.getCookies();

        if (cookies != null && cookies.length > 0) {
            for (Cookie cookie : cookies) {
                if (name.equals(cookie.getName())) {
                    log.debug("Found cookie with name: {}", name);
                    return Optional.of(cookie);
                }
            }
        }
        return Optional.empty();
    }

    public static void addCookie(HttpServletResponse response, String name, String value, int maxAge) {
        log.debug("Adding cookie with name: {} and value: {}", name, value);
        Cookie cookie = new Cookie(name, value);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setMaxAge(maxAge);

        response.addCookie(cookie);
        log.trace("Cookie added successfully");
    }

    public static void deleteCookie(HttpServletRequest request, HttpServletResponse response, String name) {
        log.debug("Deleting cookie with name: {}", name);
        Cookie[] cookies = request.getCookies();

        if (cookies != null && cookies.length > 0) {
            for (Cookie cookie : cookies) {
                if (name.equals(cookie.getName())) {
                    cookie.setValue("");
                    cookie.setPath("/");
                    cookie.setMaxAge(0);
                    response.addCookie(cookie);
                }
            }
        }
    }

    public static String serialize(Object obj) {
        log.trace("Serializing object: {}", obj);
        return Base64.getUrlEncoder()
                .encodeToString(SerializationUtils.serialize(obj));
    }

    public static <T> T deserialize(Cookie cookie, Class<T> cls) {
        log.trace("Deserializing cookie: {}", cookie.getName());
        return cls.cast(
                SerializationUtils.deserialize(
                        Base64.getUrlDecoder().decode(cookie.getValue())
                )
        );
    }

}
