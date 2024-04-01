package kr.ac.baekgoo.springboot.service;

import kr.ac.baekgoo.springboot.domain.dto.CommentReqDto;
import kr.ac.baekgoo.springboot.domain.dto.CommentResDto;

public interface CommentService {
    //    List<CommentReqDto> getAllComment(Long qna_id);
    CommentResDto createComment(Long userSeq, Long qna_id, CommentReqDto comment);
    String deleteComment(Long comment_id, Long userSeq);
    CommentResDto updateComment(Long comment_id, Long userSeq, CommentReqDto comment);
}
