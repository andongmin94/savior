package kr.ac.baekgoo.springboot.domain;

import kr.ac.baekgoo.springboot.domain.user.User;
import lombok.*;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name = "Comment")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO) //auto increment
    private Long comment_id;

    @Column(columnDefinition = "TEXT",nullable = false)
    private String comment_content;

    @Builder.Default
    private LocalDateTime comment_created_at= LocalDateTime.now();

    @Builder.Default
    private LocalDateTime comment_updated_at= LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name="comment_qna_id")
    private Qna qna;

    @ManyToOne
    @JoinColumn(name="comment_user_id") // 작성자
    private User user;

}
