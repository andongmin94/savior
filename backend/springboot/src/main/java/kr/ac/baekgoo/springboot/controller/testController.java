package kr.ac.baekgoo.springboot.controller;

import kr.ac.baekgoo.springboot.common.ApiResponse;
import kr.ac.baekgoo.springboot.domain.welfare.Welfare;
import kr.ac.baekgoo.springboot.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/test")
@RequiredArgsConstructor
public class testController {

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
}
