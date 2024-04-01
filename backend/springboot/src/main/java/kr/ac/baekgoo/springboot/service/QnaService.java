package kr.ac.baekgoo.springboot.service;

import kr.ac.baekgoo.springboot.domain.dto.QnaDto;

import java.util.List;

public interface QnaService {
    List<QnaDto> getAllQna();
    List<QnaDto> getMyQna(Long userId);
    QnaDto getQnaDetail(Long qna_id);
    QnaDto getMyQnaDetail(Long qna_id,Long userId);
    QnaDto createMyQna(QnaDto qnaDto, Long user_seq);
    String deleteMyQna(Long qna_id,Long userId);
    QnaDto findById(Long qna_id);
    String updateMyQna(Long qna_id, Long user_seq, QnaDto dto);
}
