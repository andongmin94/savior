package kr.ac.baekgoo.springboot.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import kr.ac.baekgoo.springboot.domain.welfare.Welfarelife;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "life")
public class Life {

    @Id
    @GeneratedValue
    private Long age_id;

    @Column(length = 50)
    private String age_name;

    @OneToMany
    @JsonManagedReference
    private List<Welfarelife> welfarelife = new ArrayList<>();
}
