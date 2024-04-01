package kr.ac.baekgoo.springboot.domain.dto;

import kr.ac.baekgoo.springboot.domain.Comment;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Schema(description = "댓글 Response")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommentResDto {
    @Schema(description = "댓글 아이디")
    private Long comment_id;

    @Schema(description = "댓글 내용")
    @NotBlank(message = "댓글은 Null이거나 공백일 수 없습니다")
    private String comment_content;

    @Schema(description = "작성일")
    private LocalDateTime comment_created_at;

    @Schema(description = "수정일")
    private LocalDateTime comment_updated_at;

    @Schema(description = "작성자명")
    private String name;

    @Schema(description = "qna 아이디")
    private Long qna_id;

    // Entity -> Dto
    public CommentResDto(Comment comment) {
        this.comment_id = comment.getComment_id();
        this.comment_content = comment.getComment_content();
        this.comment_created_at = comment.getComment_created_at();
        this.comment_updated_at = comment.getComment_updated_at();
        this.name = comment.getUser().getUsername();
        this.qna_id = comment.getQna().getQna_id();
    }
}
