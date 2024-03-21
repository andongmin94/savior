package org.example.springboot;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class GreetingController {

    @GetMapping("/greeting")
    public String greeting() {
        return "Hello from Spring Boot!";
    }
}