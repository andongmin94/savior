package kr.ac.baekgoo.springboot.controller;

import kr.ac.baekgoo.springboot.common.ApiResponse;
import kr.ac.baekgoo.springboot.domain.dto.QnaDto;
import kr.ac.baekgoo.springboot.domain.dto.WriteQnaDto;
import kr.ac.baekgoo.springboot.domain.user.User;
import kr.ac.baekgoo.springboot.service.QnaService;
import kr.ac.baekgoo.springboot.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin("*")
@RequestMapping("/qna")
@Tag(name = "Qna Controller")
public class QnaController {

    @Autowired
    private QnaService service;

    @Autowired
    private UserService userService;

    @GetMapping
    @Operation(summary = "전체 qna 조회", description = "전체 qna를 불러옵니다.(user 상관없이 DB에 있는 모든 qna 조회)")
    public ResponseEntity<List<QnaDto>> getAllQna() throws Exception {
        List<QnaDto> list = service.getAllQna();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/mine")
    @Operation(summary = "나의 qna 조회", description = "내가 작성한 모든 qna를 조회합니다.")
    public ApiResponse getMyQna() throws Exception {
        org.springframework.security.core.userdetails.User principal =
                (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.getUser(principal.getUsername());
        Long userId = user.getUserSeq();
        List<QnaDto> list = service.getMyQna(userId);
        return ApiResponse.success("success", list);
    }

    @GetMapping("/{qna_id}")
    @Operation(summary = "qna 상세 조회", description = "qna를 상세 조회합니다.(user 상관없이)")
    public ResponseEntity<QnaDto> getQnaDetail(@PathVariable("qna_id") Long qna_id) throws Exception {
        QnaDto qna = service.getQnaDetail(qna_id);
        return new ResponseEntity<>(qna, HttpStatus.OK);
    }

    @GetMapping("/mine/{qna_id}")
    @Operation(summary = "나의 qna 상세 조회", description = "등록한 qna를 상세 조회")
    public ApiResponse getMyQnaDetail(@PathVariable("qna_id") Long qna_id) throws Exception {
        org.springframework.security.core.userdetails.User principal =
                (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.getUser(principal.getUsername());
        Long userId = user.getUserSeq();
        QnaDto qna = service.getMyQnaDetail(qna_id, userId);
        return ApiResponse.success("success", qna);
    }

    @PostMapping("/mine")
    @Operation(summary = "qna 등록", description = "qna를 등록합니다.")
    public ApiResponse createMyQna(@RequestBody WriteQnaDto dto) throws Exception {
        org.springframework.security.core.userdetails.User principal =
                (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.getUser(principal.getUsername());
        Long userId = user.getUserSeq();
        QnaDto qnaDto = QnaDto.of(dto);
        QnaDto qna = service.createMyQna(qnaDto, userId);
        return ApiResponse.success("success", qna);
    }

    @DeleteMapping("/mine/{qna_id}")
    @Operation(summary = "qna 삭제", description = "qna를 삭제합니다.")
    public ApiResponse deleteMyQna(@PathVariable("qna_id") Long qna_id) throws Exception {
        org.springframework.security.core.userdetails.User principal =
                (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.getUser(principal.getUsername());
        Long userId = user.getUserSeq();
        String result = service.deleteMyQna(qna_id, userId);
        return ApiResponse.success("success", result);
    }

    @PatchMapping("/mine/{qna_id}")
    @Operation(summary = "QnA 수정", description = "QnA 수정, 수정된 내용이 없다면 뒤로 돌아가거나 기존 내용을 기입해주세요.")
    public ApiResponse updateMyQna(@PathVariable("qna_id") Long qna_id, @RequestBody WriteQnaDto dto) throws Exception {
        org.springframework.security.core.userdetails.User principal =
                (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.getUser(principal.getUsername());
        Long userId = user.getUserSeq();
        QnaDto qnaDto = QnaDto.of(dto);
        String result = service.updateMyQna(qna_id, userId, qnaDto);
        return ApiResponse.success("success", result);
    }
}