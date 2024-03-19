package kr.ac.baekgoo.springboot.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.antlr.v4.runtime.misc.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class)
@Table(name = "USER")
public class User {
    @Id
    @Column(name = "USER_SEQ")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userSeq;

    @OneToMany(mappedBy = "user")
    private List<Usedwelfare> usedwelfares = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Likewelfare> likewelfares = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Selectfamily> selectfamilies = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Selecttarget> selecttargets = new ArrayList<>();

    @Column(name = "USER_ID", length = 64, unique = true)
    @NotNull
    @Size(max = 64)
    private String userId;

    @Column(name = "USERNAME", length = 100)
    @NotNull
    @Size(max = 100)
    private String username;

    @JsonIgnore
    @Column(name = "PASSWORD", length = 128)
    @Size(max = 128)
    private String password;

    @Column(name = "PROFILE_IMAGE_URL", length = 512)
    @Size(max = 512)
    private String profileImageUrl;

    @Column(name = "CREATED_AT")
    private LocalDateTime createdAt;

    @Column(name = "MODIFIED_AT")
    private LocalDateTime modifiedAt;

    @Column(name = "AGE")
    private String ageRange;

    @Column(name = "MALE")
    private Long male;

    @Column(name = "FEMALE")
    private Long female;

    @Column(name = "BIRTH")
    private String birth;

    @Column(name = "CHILD")
    private String child;

    @Column(name = "USER_GROUP")
    private Long userGroup;

    public User(
            @NotNull
            @Size(max = 64)
            String userId,

            @NotNull
            @Size(max = 100)
            String username,

            @Size(max = 512)
            String profileImageUrl,

            LocalDateTime createdAt,

            LocalDateTime modifiedAt
    ) {
        this.userId = userId;
        this.username = username;
        this.password = "NO_PASS";
        this.profileImageUrl = profileImageUrl != null ? profileImageUrl : "";
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;
    }
}
