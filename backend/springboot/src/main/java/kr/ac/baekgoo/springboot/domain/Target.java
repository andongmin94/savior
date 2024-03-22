package kr.ac.baekgoo.springboot.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import kr.ac.baekgoo.springboot.domain.welfare.Welfaretarget;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "target")
public class Target {

    @Id
    @GeneratedValue
    private Long targetId;

    @Column(length = 50)
    private String targetName;

    @OneToMany
    @JsonManagedReference
    private List<Welfaretarget> welfaretarget = new ArrayList<>();

}
