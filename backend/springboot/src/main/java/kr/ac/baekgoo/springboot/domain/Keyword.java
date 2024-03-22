package kr.ac.baekgoo.springboot.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Getter @Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Keyword {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long keywordId;

    private String keywordName;

    private Long keywordCnt;

    public void setkeywordName(String name) {
        this.keywordName = name;
    }

    public Long setKeywordCnt(Long CntOfKeyword) {
        this.keywordCnt = CntOfKeyword;
        return this.keywordCnt;
    }
}
