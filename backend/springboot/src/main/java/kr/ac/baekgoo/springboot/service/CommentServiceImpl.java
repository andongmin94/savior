package kr.ac.baekgoo.springboot.service;

import kr.ac.baekgoo.springboot.domain.Comment;
import kr.ac.baekgoo.springboot.domain.Qna;
import kr.ac.baekgoo.springboot.domain.dto.CommentReqDto;
import kr.ac.baekgoo.springboot.domain.dto.CommentResDto;
import kr.ac.baekgoo.springboot.domain.user.User;
import kr.ac.baekgoo.springboot.repository.CommentRepository;
import kr.ac.baekgoo.springboot.repository.user.QnaRepository;
import kr.ac.baekgoo.springboot.repository.user.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Slf4j
public class CommentServiceImpl implements CommentService{
    @Autowired
    CommentRepository repo;
    @Autowired
    UserRepository userrepo;
    @Autowired
    QnaRepository qnarepo;

    @Override
    public CommentResDto createComment(Long userSeq, Long qna_id, CommentReqDto dto) {
        Optional<User> user=userrepo.findById(userSeq);
        log.info("user 정보::{}, 아이디::{}",user.get().getUsername(),user.get().getUserSeq());
        Optional<Qna> qna=qnarepo.findById(qna_id);
        log.info("qna 정보::{}, 아이디::{}",qna.get().getQna_title(),qna.get().getQna_id());
        if(!qna.isPresent()) throw new NullPointerException("존재하지 않는 게시글입니다.");
        dto.setUser(user.get());
        dto.setQna(qna.get());
        Comment comment= Comment.builder()
                .comment_content(dto.getComment_content())
                .comment_created_at(LocalDateTime.now())
                .comment_updated_at(LocalDateTime.now())
                .user(dto.getUser())
                .qna(dto.getQna())
                .build();
        repo.save(comment);
        CommentResDto re=CommentResDto.builder()
                .comment_id(comment.getComment_id())
                .comment_content(comment.getComment_content())
                .comment_created_at(comment.getComment_created_at())
                .comment_updated_at(comment.getComment_updated_at())
                .name(user.get().getUsername())
                .qna_id(qna_id)
                .build();
        return re;
    }

    @Override
    public String deleteComment(Long comment_id,Long user_seq) {
        log.info("comment id 확인 :{}",comment_id);
        Optional<Comment> comment=repo.findById(comment_id);
        if(!comment.isPresent()) throw new NullPointerException("존재하지 않는 댓글입니다.");
        if(comment.get().getUser().getUserSeq()!=user_seq) throw new NullPointerException("작성자만 수정할 수 있습니다.");
        repo.delete(comment.get());
        return "success";
    }

    @Override
    public CommentResDto updateComment(Long comment_id, Long user_seq, CommentReqDto dto) {
        log.info("comment id 확인 :{}",comment_id);
        Optional<Comment> findcomment=repo.findById(comment_id);
        if(!findcomment.isPresent()) throw new NullPointerException("존재하지 않는 댓글입니다.");
        if(findcomment.get().getUser().getUserSeq()!=user_seq) throw new NullPointerException("작성자만 수정할 수 있습니다.");
        Comment comment=Comment.builder()
                .comment_id(comment_id)
                .comment_content(dto.getComment_content())
                .comment_created_at(dto.getComment_created_at())
                .comment_updated_at(LocalDateTime.now())
                .user(findcomment.get().getUser())
                .qna(findcomment.get().getQna())
                .build();
        repo.save(comment);
        CommentResDto re=CommentResDto.builder()
                .comment_id(comment.getComment_id())
                .comment_content(comment.getComment_content())
                .comment_created_at(comment.getComment_created_at())
                .comment_updated_at(comment.getComment_updated_at())
                .name(comment.getUser().getUsername())
                .qna_id(comment.getQna().getQna_id())
                .build();
        return re;
    }
}
