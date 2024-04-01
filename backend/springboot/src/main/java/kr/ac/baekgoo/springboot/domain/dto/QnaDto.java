package kr.ac.baekgoo.springboot.domain.dto;


import kr.ac.baekgoo.springboot.domain.Qna;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Schema(description = "게시글 정보")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class QnaDto {

    @Schema(description = "게시글 id")
    private Long id;

    @Schema(accessMode = Schema.AccessMode.READ_ONLY, readOnly = true, required = false, description = "게시글 작성자", nullable = true)
    private UserDto user;

    @NotBlank(message = "제목은 Null이거나 공백일 수 없습니다")
    @Schema(description = "게시글 제목")
    private String title;

    @NotBlank(message = "내용은 Null이거나 공백일 수 없습니다")
    @Schema(description = "게시글 내용")
    private String content;

    @Schema(accessMode = Schema.AccessMode.READ_ONLY, description = "게시글 작성 날짜", nullable = true)
    private LocalDateTime qna_created_at=LocalDateTime.now();

    @Schema(accessMode = Schema.AccessMode.READ_ONLY, description = "게시글 수정 날짜", nullable = true)
    private LocalDateTime qna_updated_at=LocalDateTime.now();

    @Schema(description = "댓글 내용")
    private List<CommentResDto> comments;

    public static QnaDto of(WriteQnaDto writeQna) {
        return QnaDto.builder()
                .title(writeQna.getTitle())
                .content(writeQna.getContent())
                .build();
    }
    public static QnaDto of(Qna qna) {
        return QnaDto.builder()
                .id(qna.getQna_id())
                .title(qna.getQna_title())
                .content(qna.getQna_content())
                .qna_created_at(qna.getQna_created_at())
                .qna_updated_at(qna.getQna_updated_at())
                .user(UserDto.of(qna.getUser()))
                .comments(qna.getComments().stream().map(CommentResDto::new).collect(Collectors.toList()))
                .build();
    }
}
