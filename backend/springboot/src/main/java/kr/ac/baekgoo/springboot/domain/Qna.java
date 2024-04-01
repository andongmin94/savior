package kr.ac.baekgoo.springboot.domain;

import kr.ac.baekgoo.springboot.domain.dto.QnaDto;
import kr.ac.baekgoo.springboot.domain.user.User;
import lombok.*;
import net.minidev.json.annotate.JsonIgnore;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name = "Qna")
public class Qna {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO) //auto increment
    private Long qna_id;

    @ManyToOne(fetch = FetchType.LAZY) //게시글 쓴 사람
    @JoinColumn(name="qna_user_id") //매핑할 키 값, user pk와 매핑됨
    private User user;

    @Column(length = 100)
    private String qna_title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String qna_content;

    @Builder.Default
    private LocalDateTime qna_created_at=LocalDateTime.now();
    @Builder.Default
    private LocalDateTime qna_updated_at=LocalDateTime.now();

    // comment와 양방향 관계
    @OneToMany(mappedBy = "qna", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
    private List<Comment> comments;


    public static Qna of(QnaDto qnaDto, User user){
        return Qna.builder()
                .qna_title(qnaDto.getTitle())
                .qna_content(qnaDto.getContent())
                .qna_created_at(LocalDateTime.now())
                .qna_updated_at(LocalDateTime.now())
                .user(user)
                .build();
    }
}
