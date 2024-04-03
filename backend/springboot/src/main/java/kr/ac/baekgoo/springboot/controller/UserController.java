package kr.ac.baekgoo.springboot.controller;

import kr.ac.baekgoo.springboot.common.ApiResponse;
import kr.ac.baekgoo.springboot.domain.dto.CharacterDto;
import kr.ac.baekgoo.springboot.domain.dto.ProfileDto;
import kr.ac.baekgoo.springboot.domain.user.Likewelfare;
import kr.ac.baekgoo.springboot.domain.user.Usedwelfare;
import kr.ac.baekgoo.springboot.domain.user.User;
import kr.ac.baekgoo.springboot.domain.welfare.Welfare;
import kr.ac.baekgoo.springboot.service.UserService;
import kr.ac.baekgoo.springboot.service.WelfareService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final WelfareService welfareService;

    @GetMapping()
    public ApiResponse getUser() {
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        User user = userService.getUser(principal.getUsername());
        return ApiResponse.success("user", user);
    }

    @GetMapping("/profile")
    public ApiResponse getUserInfo() {
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        User user = userService.getUser(principal.getUsername());

        return ApiResponse.success("user", user);
    }

    @GetMapping("/used")
    public ApiResponse getUsedWelfare(){
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.getUser(principal.getUsername());
        List<Usedwelfare> used = userService.getAllUsedList();
        List<Welfare> res = new ArrayList<>();
        for(Usedwelfare i: used){
            if(i.getUser().getUserSeq()==user.getUserSeq()){
                res.add(welfareService.getWelfare(i.getWelfare().getWelfareId()));
            }
        }
        return ApiResponse.success("usedWelfareList",res);
    }

    @PutMapping("/used/{welfare_id}")
    public ApiResponse saveUsedWelfare(@PathVariable("welfare_id") Long welfare_id){
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.getUser(principal.getUsername());
        Usedwelfare used = new Usedwelfare();
        used.setUser(user);
        used.setWelfare(welfareService.getWelfare(welfare_id));
        userService.setUserUsedRepository(used);

        return ApiResponse.success("save","success");
    }

    @DeleteMapping ("/used/{welfare_id}")
    public ApiResponse deleteUsedWelfare(@PathVariable("welfare_id") Long welfare_id){
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.getUser(principal.getUsername());
        Usedwelfare used = new Usedwelfare();
        used.setUser(user);
        used.setWelfare(welfareService.getWelfare(welfare_id));
        userService.deleteUserUsedRepository(used);

        return ApiResponse.success("save","success");
    }

    @GetMapping("/like")
    public ApiResponse getLikeWelfare(){
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.getUser(principal.getUsername());
        List<Likewelfare> like = userService.getAllLikeList();
        List<Welfare> res = new ArrayList<>();
        for(Likewelfare i:like){
            if(i.getUser().getUserSeq()==user.getUserSeq()){
                res.add(welfareService.getWelfare(i.getWelfare().getWelfareId()));
            }
        }
        return ApiResponse.success("likeList",res);
    }

    @PutMapping("/like/{welfare_id}")
    public ApiResponse saveLikeWelfare(@PathVariable("welfare_id") Long welfare_id){
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.getUser(principal.getUsername());
        Likewelfare like = new Likewelfare();
        like.setUser(user);
        like.setWelfare(welfareService.getWelfare(welfare_id));
        userService.setLikeRepository(like);

        return ApiResponse.success("save","success");
    }

    @DeleteMapping ("/like/{welfare_id}")
    public ApiResponse deleteLikeWelfare(@PathVariable("welfare_id") Long welfare_id){
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.getUser(principal.getUsername());
        Likewelfare like = new Likewelfare();
        like.setUser(user);
        like.setWelfare(welfareService.getWelfare(welfare_id));
        userService.deleteLikeRepository(like);

        return ApiResponse.success("save","success");
    }

    @PostMapping("/update/char")
    public ApiResponse updateUserCharacter(@RequestBody CharacterDto dto){
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.getUser(principal.getUsername());
        userService.updateUserCharacter(dto,user.getUserId());
        return ApiResponse.success("성공","성공");
    }

    @GetMapping("/update/char")
    public ApiResponse getUserCharacter(){
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.getUser(principal.getUsername());
        CharacterDto dto = new CharacterDto();
        dto.setChild(user.getChild());
        dto.setFamily(userService.getAllSelectFamily(user.getUserSeq()));
        dto.setJob(userService.getAllSelectTarget(user.getUserSeq()));
        return ApiResponse.success("UserCharacter",dto);
    }

    @PostMapping("/update/profile")
    public ApiResponse updateUserProfile(@RequestBody ProfileDto dto){
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.getUser(principal.getUsername());
        userService.updateUserProfile(dto,user.getUserId());
        String response = "연령대: "+dto.getAge()+" 성별: "+dto.getGender()+" 입력";
        return ApiResponse.success("Response",response);
    }

    @DeleteMapping("/delete")
    public ApiResponse deleteUser(){
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.getUser(principal.getUsername());
        String response = user.getUsername()+" 삭제 완료";
        userService.deleteUser(user.getUserId());
        return ApiResponse.success("Delete",response);
    }
}
