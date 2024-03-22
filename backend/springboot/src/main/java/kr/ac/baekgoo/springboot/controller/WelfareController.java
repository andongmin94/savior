package kr.ac.baekgoo.springboot.controller;

import kr.ac.baekgoo.springboot.common.ApiResponse;
import kr.ac.baekgoo.springboot.domain.user.User;
import kr.ac.baekgoo.springboot.domain.welfare.Welfare;
import kr.ac.baekgoo.springboot.service.UserService;
import kr.ac.baekgoo.springboot.service.WelfareService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/welfare")
@RequiredArgsConstructor
public class WelfareController {

    private final UserService userService;
    private final WelfareService welfareService;

    @GetMapping("/{welfare_id}")
    public ApiResponse getwelfare(@PathVariable("welfare_id") Long welfare_id) {
        Welfare welfare = welfareService.getWelfare(welfare_id);
        return ApiResponse.success("welfare", welfare);
    }

    @GetMapping("/{welfare_id}/recommend")
    public List getwelfarelike(@PathVariable("welfare_id") Long welfare_id) {
        List list = welfareService.getSimilarWelfare(welfare_id);
        return list;
    }

    @GetMapping("/recommend")
    public ApiResponse getwelfaregroup() {
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.getUser(principal.getUsername());
        if (user == null) {
            return ApiResponse.fail();
        }
        Long group = user.getUserGroup();
        List<Welfare> list = welfareService.getWelfarebygroup(group);
        return ApiResponse.success("welfare", list);
    }
}