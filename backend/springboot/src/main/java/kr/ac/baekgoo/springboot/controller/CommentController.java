package kr.ac.baekgoo.springboot.controller;

import kr.ac.baekgoo.springboot.common.ApiResponse;
import kr.ac.baekgoo.springboot.domain.dto.CommentReqDto;
import kr.ac.baekgoo.springboot.domain.dto.CommentResDto;
import kr.ac.baekgoo.springboot.domain.user.User;
import kr.ac.baekgoo.springboot.service.CommentService;
import kr.ac.baekgoo.springboot.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@Slf4j
@RestController
@CrossOrigin("*")
@RequestMapping("/comment")
@Tag(name = "Comment", description = "Comment API")
public class CommentController {
    @Autowired
    CommentService service;

    @Autowired
    UserService userService;

    @PostMapping("/{qna_id}")
    @Operation(summary = "댓글 작성", description = "댓글 작성")
    public ApiResponse createComment(@PathVariable("qna_id") Long qna_id, @RequestParam("content") String content) throws Exception {
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.getUser(principal.getUsername());
        log.info("유저 확인: {}", user.getUsername());
        Long userId = user.getUserSeq();
        CommentReqDto dto = new CommentReqDto();
        dto.setComment_content(content);
        CommentResDto resDto = service.createComment(userId, qna_id, dto);
        return ApiResponse.success("success", resDto);
    }

    @DeleteMapping("/{comment_id}")
    @Operation(summary = "댓글 삭제", description = "댓글 삭제")
    public ApiResponse deleteComment(@PathVariable("comment_id") Long comment_id) throws Exception {
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.getUser(principal.getUsername());
        log.info("유저 확인: {}", user.getUsername());
        Long userId = user.getUserSeq();
        String result = service.deleteComment(comment_id, userId);
        return ApiResponse.success("success", result);
    }

    @PatchMapping("/{comment_id}")
    @Operation(summary = "댓글 수정", description = "댓글 수정, 'comment_created_at' 수정 금지'")
    public ApiResponse updateComment(@PathVariable("comment_id") Long comment_id, @RequestParam("content") String content) throws Exception {
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.getUser(principal.getUsername());
        log.info("유저 확인: {}", user.getUsername());
        Long userId = user.getUserSeq();
        CommentReqDto dto = new CommentReqDto();
        dto.setComment_content(content);
        CommentResDto resDto = service.updateComment(comment_id, userId, dto);
        return ApiResponse.success("success", resDto);
    }
}
