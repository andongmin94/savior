package kr.ac.baekgoo.springboot.service;

import kr.ac.baekgoo.springboot.domain.welfare.Welfare;
import kr.ac.baekgoo.springboot.repository.welfare.WelfareRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class WelfareService {

    @Autowired
    private final WelfareRepository welfareRepository;

    public Welfare getWelfare(Long welfare_id) {
        return welfareRepository.findByWelfareId(welfare_id);
    }

    public List getWelfarebykeyword(String keyword) {
        return welfareRepository.searchWelfare(keyword);
    }

    public List getSimilarWelfare(Long welfare_id) {
        return welfareRepository.getSimilar(welfare_id);
    }

//    public List<Welfare> getWelfarebygroup(Long group_id) {
//        return welfareRepository.getGroupWelfare(group_id);
//    } 임시
    public List<Welfare> getWelfarebygroup(Long group_id) {
        Random random = new Random();
        Long random_group_id = random.nextLong(49) - 1;
        System.out.println("Warn Info WelfareService.getWelfarebygroup, randnom = " + random_group_id);
        return welfareRepository.getGroupWelfare(random_group_id);
    }

    public List<Welfare> getPopularWelfare() {
        return welfareRepository.getMostUserWelfare();
    }

    public List<Welfare> getPopularInGroup(Long group) { return welfareRepository.getGroupPopularWelfare(group); }

}
