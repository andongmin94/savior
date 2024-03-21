package kr.ac.baekgoo.springboot.domain.user;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import kr.ac.baekgoo.springboot.domain.welfare.Welfare;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class)
@Table(name = "USED")
public class Usedwelfare {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "USER_SEQ")
    private User user;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "welfareId")
    private Welfare welfare;

    @Override
    public String toString() {
        return "Usedwelfare{" +
                "id=" + id +
                ", userSeq=" + user.getUserSeq() +
                ", welfareId=" + welfare.getWelfareId() +
                '}';
    }
}
