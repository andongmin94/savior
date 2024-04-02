package kr.ac.baekgoo.springboot.controller;

import kr.ac.baekgoo.springboot.common.ApiResponse;
import kr.ac.baekgoo.springboot.domain.Keyword;
import kr.ac.baekgoo.springboot.domain.user.User;
import kr.ac.baekgoo.springboot.domain.welfare.Welfare;
import kr.ac.baekgoo.springboot.service.KeywordService;
import kr.ac.baekgoo.springboot.service.UserService;
import kr.ac.baekgoo.springboot.service.WelfareService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.*;


@Log4j2
@RestController
@CrossOrigin("*")
@RequestMapping("/welfare")
@RequiredArgsConstructor
public class WelfareController {

    private final UserService userService;
    private final WelfareService welfareService;
    private final KeywordService keywordService;

    @GetMapping("/{welfare_id}")
    public ApiResponse getwelfare(@PathVariable("welfare_id") Long welfare_id) {
        Welfare welfare = welfareService.getWelfare(welfare_id);
        return ApiResponse.success("welfare", welfare);
    }

    // welfare_id의 유사 복지 추천
    @GetMapping("/{welfare_id}/recommend")
    public List getwelfarelike(@PathVariable("welfare_id") Long welfare_id) {
        List list = welfareService.getSimilarWelfare(welfare_id);
        return list;
    }

    // user가 속한 userGroup 기반 추천
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

    // 도넛차트
    @GetMapping("/recommend/purpose")
    public Map getwelfarepurpose() {
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.getUser(principal.getUsername());
        if (user == null) {
            return null;
        }
        Long group = user.getUserGroup();
        List<Welfare> list = welfareService.getWelfarebygroup(group);

        LinkedHashMap<String, Long> purposes = new LinkedHashMap<>();

        for (int i = 0; i < list.size(); i ++) {
            String purposename = list.get(i).getWelfare_service_type();
            if (purposename != null) {
                if (purposename.contains("||")) {
                    String[] purposelist = purposename.split("\\|\\|");
                    for (int j = 0; j < purposelist.length; j++) {
                        String nowpurposename = purposelist[j];
                        if (nowpurposename.contains("(")) {
                            String [] spl = nowpurposename.split("\\(");
                            nowpurposename = spl[0];
                        }
                        if (purposes.get(nowpurposename) == null) {
                            purposes.put(nowpurposename, 1L);
                        } else {
                            purposes.put(nowpurposename, purposes.get(nowpurposename) + 1L);
                        }
                    }
                } else
                {
                    if (purposename.contains("(")) {
                        String [] spl = purposename.split("\\(");
                        purposename = spl[0];
                    }
                    if (purposes.get(purposename) == null) {
                        purposes.put(purposename, 1L);
                    } else {
                        purposes.put(purposename, purposes.get(purposename) + 1L);
                    }
                }
            }
        }
        return purposes;
    }

    @GetMapping("/recommend/grouppopular")
    public List getwelfaregrouppopular() {
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.getUser(principal.getUsername());
        if (user == null) {
            return null;
        }
        Long group = user.getUserGroup();

        List popularview = new ArrayList<Object>();

        List<Welfare> list = welfareService.getPopularInGroup(group);

        for (int i = 0; i < 6; i ++) {
            Map<String, Object> newmap = new HashMap<String, Object>();
            newmap.put("welfare_id", list.get(i).getWelfareId());
            newmap.put("welfare_service_name", list.get(i).getWelfare_service_name());
            newmap.put("welfare_view", list.get(i).getWelfare_view());
            newmap.put("welfare_service_content", list.get(i).getWelfare_service_content());

            popularview.add(newmap);
        }
        return popularview;
    }

    @GetMapping("/popular")
    public ApiResponse getwelfarepopular() {
        List<Welfare> list = welfareService.getPopularWelfare();
        return ApiResponse.success("welfare", list);
    }

    @GetMapping("/search/{keyword}")
    public List welfaresearch(@PathVariable("keyword") String keyword) {
        List list = welfareService.getWelfarebykeyword(keyword);
        if (list.size() != 0) {
            keywordService.getOrsetKeywordbyname(keyword);
        }
        return list;
    }

    @GetMapping("/keyword")
    public ApiResponse loadkeyword() {
        List<Keyword> list = keywordService.getPopularKeyword();
        return ApiResponse.success("keywords", list);
    }

    public static LinkedHashMap<String, Long> sortMapByValue(Map<String, Long> map) {
        List<Map.Entry<String, Long>> entries = new LinkedList<>(map.entrySet());
        Collections.sort(entries, (o1, o2) -> o2.getValue().compareTo(o1.getValue()));

        LinkedHashMap<String, Long> result = new LinkedHashMap<>();
        for (Map.Entry<String, Long> entry : entries) {
            result.put(entry.getKey(), entry.getValue());
        }
        return result;
    }
}