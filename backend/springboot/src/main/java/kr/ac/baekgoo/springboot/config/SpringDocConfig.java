package kr.ac.baekgoo.springboot.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.Contact;

import org.springdoc.core.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(info = @Info(
        title = "Savior API",
        version = "V1",
        description = "Savior API Reference for Developers",
        contact = @Contact(name = "Savior", url = "https://j10d109.p.ssafy.io/", email = "gumissafy00@gmail.com")
))

public class SpringDocConfig {
    @Bean
    public GroupedOpenApi publicApi() {
        return GroupedOpenApi.builder()
                .group("v1")
                .packagesToScan("kr.ac.baekgoo.springboot.controller") // API 문서를 생성할 컨트롤러가 있는 패키지
                .build();
    }
}
