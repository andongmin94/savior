package kr.ac.baekgoo.springboot.service;

import kr.ac.baekgoo.springboot.domain.Keyword;
import kr.ac.baekgoo.springboot.repository.welfare.KeywordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class KeywordService {

    @Autowired
    private final KeywordRepository keywordRepository;

    public List<Keyword> getPopularKeyword() {
        return keywordRepository.getPopular();
    }

    public Keyword findByName(String name) {
        List<Keyword> keywords = keywordRepository.findAllKeyword();
        for (Keyword keyword : keywords) {
            if (keyword.getKeywordName().equals(name))
                return keyword;
        }
        return null;
    }

    @Transactional
    public void getOrsetKeywordbyname(String name) {
        Keyword keyword = findByName(name);
        if (keyword != null) {
            keyword.setKeywordCnt(keyword.getKeywordCnt() + 1);
        } else {
            Keyword keyword1 = new Keyword();
            keyword1.setKeywordCnt(1L);
            keyword1.setkeywordName(name);
            keywordRepository.save(keyword1);
        }
    }
}
