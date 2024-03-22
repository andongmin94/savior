package kr.ac.baekgoo.springboot.domain.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import kr.ac.baekgoo.springboot.domain.user.User;
import lombok.*;

@Schema(description = "게시글 유저 정보")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    @Schema(description = "유저 id")
    private Long userSeq;

    public static UserDto of(User user) {
        return UserDto.builder()
                .userSeq(user.getUserSeq())
                .build();
    }

}
