package kr.ac.baekgoo.springboot.domain.welfare;

import jakarta.persistence.*;
import kr.ac.baekgoo.springboot.domain.user.Usedwelfare;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "welfare")
public class Welfare {

    @Id @GeneratedValue
    @Column(name = "welfareId")
    private Long welfareId;

    @Column(name = "welfareOriId")
    private String welfareOriId;

    @Column(name = "welfareServiceName")
    private String welfare_service_name;

    @Column(name = "welfareDeptName")
    private String welfare_dept_name;

    @Column(name = "welfareServiceType")
    private String welfare_service_type;

    @Column(columnDefinition = "TEXT", name = "welfareDate")
    private String welfare_date;

    @Column(columnDefinition = "TEXT", name = "welfareServicePurpose")
    private String welfare_service_purpose;

    @Column(columnDefinition = "TEXT", name = "welfareTargetDetail")
    private String welfare_target_detail;

    @Column(columnDefinition = "TEXT", name = "welfareCrit")
    private String welfare_crit;

    @Column(columnDefinition = "TEXT", name = "welfareServiceContent")
    private String welfare_service_content;

    @Column(columnDefinition = "TEXT", name = "welfareHowto")
    private String welfare_howto;

    @Column(name = "welfareContact")
    private String welfare_contact;

    @Column(name = "welfarePhone")
    private String welfare_phone;

    @Column(name = "welfareSiteName")
    private String welfare_site_name;

    @Column(name = "welfareSiteLink")
    private String welfare_site_link;

    @Column(name = "welfareView")
    private Long welfare_view;

    @Column(name = "welfareMale")
    private Long welfare_male;

    @Column(name = "welfareFemale")
    private Long welfare_female;

    @Column(name = "welfareGroup")
    private Long welfare_group;

    @Column(columnDefinition = "TINYINT", length = 2)
    private Long welfare_child;

    @OneToMany(mappedBy = "welfare")
    private List<Welfaretarget> welfaretarget = new ArrayList<>();


    @OneToMany(mappedBy = "welfare")
    private List<Welfarefamily> welfarefamily = new ArrayList<>();


    @OneToMany(mappedBy = "welfare")
    private List<Welfarelife> welfarelife = new ArrayList<>();


    @OneToMany(mappedBy = "welfare")
    private List<Usedwelfare> usedwelfares = new ArrayList<>();

    @Column(name = "welfareSimilarWelfare")
    private String welfare_similarwelfare;
}