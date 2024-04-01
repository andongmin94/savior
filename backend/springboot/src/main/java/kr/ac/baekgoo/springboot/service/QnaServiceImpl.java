package kr.ac.baekgoo.springboot.service;

import kr.ac.baekgoo.springboot.domain.Qna;
import kr.ac.baekgoo.springboot.domain.dto.QnaDto;
import kr.ac.baekgoo.springboot.domain.dto.UserDto;
import kr.ac.baekgoo.springboot.domain.user.User;
import kr.ac.baekgoo.springboot.repository.CommentRepository;
import kr.ac.baekgoo.springboot.repository.user.QnaRepository;
import kr.ac.baekgoo.springboot.repository.user.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class QnaServiceImpl implements QnaService{
    @Autowired
    QnaRepository repo;
    @Autowired
    UserRepository userRepo;
    @Autowired
    CommentRepository commentRepo;

    @Override
    public List<QnaDto> getAllQna() {
        List<Qna> all = repo.findAll();
        List<QnaDto> qnaDtos = new ArrayList<>();
        QnaDto dto;
        // entity -> dto 변환
        for (int i=0; i<all.size(); i++){
            dto=new QnaDto();
            Qna entity=all.get(i);
            dto.setId(entity.getQna_id());
            dto.setUser(UserDto.of(entity.getUser()));
            dto.setTitle(entity.getQna_title());
            dto.setContent(entity.getQna_content());
            dto.setQna_created_at(entity.getQna_created_at());
            dto.setQna_updated_at(entity.getQna_updated_at());
            qnaDtos.add(dto);
        }
        return qnaDtos;
    }

    @Override
    public List<QnaDto> getMyQna(Long userId) {
        List<Qna> all = repo.findAllByUserId(userId);
        List<QnaDto> qnaDtos = new ArrayList<>();
        QnaDto dto;
        // entity -> dto 변환
        for (int i=0; i<all.size(); i++){
            dto=new QnaDto();
            Qna entity=all.get(i);
            dto.setId(entity.getQna_id());
            dto.setUser(UserDto.of(entity.getUser()));
            dto.setTitle(entity.getQna_title());
            dto.setContent(entity.getQna_content());
            dto.setQna_created_at(entity.getQna_created_at());
            dto.setQna_updated_at(entity.getQna_updated_at());
            qnaDtos.add(dto);
        }
        return qnaDtos;
    }

    @Override
    public QnaDto getQnaDetail(Long qna_id) {
        Optional<Qna> q=repo.findById(qna_id);
        // entity -> dto 변환
        QnaDto dto=QnaDto.of(q.get());
        return dto;
    }

    @Override
    public QnaDto getMyQnaDetail(Long qna_id, Long userId) {
        Optional<Qna> q=repo.findByQnaIdAndUserId(qna_id,userId);
        // entity -> dto 변환
        QnaDto dto=QnaDto.of(q.get());
        return dto;
    }

    @Override
    public QnaDto createMyQna(QnaDto qnaDto, Long user_seq) {
        Optional<User> fuser=userRepo.findById(user_seq);
        if(!fuser.isPresent()) throw new NullPointerException("존재하지 않는 유저입니다.");
        Qna qna=Qna.of(qnaDto,fuser.get());
        repo.save(qna);
        QnaDto dto=QnaDto.builder()
                .id(qna.getQna_id())
                .title(qna.getQna_title())
                .content(qna.getQna_content())
                .qna_created_at(qna.getQna_created_at())
                .user(UserDto.of(qna.getUser()))
                .build();
        return dto;
    }

    @Override
    public String deleteMyQna(Long qna_id, Long userId) {
        Optional<Qna> qna=repo.findById(qna_id);
        if(!qna.isPresent()) throw new NullPointerException("존재하지 않는 qna입니다.");
        if(!qna.get().getUser().getUserSeq().equals(userId)) throw new NullPointerException("qna 작성자만 삭제할 수 있습니다.");
        repo.delete(qna.get());
        return "success";
    }

    @Override
    public QnaDto findById(Long qna_id) {
        Optional<Qna> qna=repo.findById(qna_id);
        if(!qna.isPresent()) throw new NullPointerException("존재하지 않는 qna입니다.");
        QnaDto dto=QnaDto.of(qna.get());
        return dto;
    }

    @Override
    public String updateMyQna(Long qna_id, Long user_seq, QnaDto dto) {
        Optional<Qna> findqna=repo.findById(qna_id);
        // 게시글이 없을 때
        if(!findqna.isPresent()) throw new NullPointerException("존재하지 않는 qna입니다.");
        // 내가 쓴 게시글만 수정 가능
        if(findqna.get().getUser().getUserSeq()!=user_seq) throw new NullPointerException("작성자만 수정 가능합니다.");
        Qna qna=Qna.builder()
                .qna_id(qna_id)
                .qna_title(dto.getTitle())
                .qna_content(dto.getContent())
                .qna_updated_at(LocalDateTime.now())
                .user(findqna.get().getUser())
                .comments(findqna.get().getComments())
                .build();
        repo.save(qna);
        return "success";
    }
}
