package kr.ac.baekgoo.springboot.domain.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import jakarta.validation.constraints.NotBlank;

@Schema(description = "게시글 작성")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WriteQnaDto {

    @NotBlank(message = "제목은 Null이거나 공백일 수 없습니다")
    @Schema(description = "게시글 제목")
    private String title;

    @NotBlank(message = "내용은 Null이거나 공백일 수 없습니다")
    @Schema(description = "게시글 내용")
    private String content;
}
