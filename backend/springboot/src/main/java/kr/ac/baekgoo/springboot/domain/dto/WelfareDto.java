package kr.ac.baekgoo.springboot.domain.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Schema(description = "복지 정보")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WelfareDto {
    Long welfare_id;
    String welfare_name;
    String welfare_content;
}
