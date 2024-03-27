package kr.ac.baekgoo.springboot;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class GreetingController {

    @GetMapping("/api/greeting")
    public String greeting() {
        return "Hello from Spring Boot!";
    }
}
